package handlers

import (
	"database/sql"
	"dreamchasers/models"
	"dreamchasers/services"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// - Name Format: {Method}+{WhatItDoes/Name}
type Handler struct{}

// TEST function | Just remove this when done
func (h Handler) GetOla(w http.ResponseWriter, r *http.Request) {
	secret := "Ola"
	fmt.Println(secret)
	w.Write([]byte(secret))
}

// func (h Handler) PostReservation(w http.ResponseWriter, r *http.Request) {
// TODO @Isa, hier gaat een verzoek van de fronten binnen komen, met json data.
// Kan jij de data uit die json halen en inserten in de database?
// Waarschijnlijk hep je iets zoals "json marshaling" nodig. Alle structs zijn al
// gedefinieerd onder het mapje `models/`. Succes :D
//}

// REMOVE THIS AND DO IT IN THE CORRECT WAY
func startDB() *sql.DB {
	envList := services.LoadEnv()

	db, err := services.InitializeDatabase(envList)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(25)
	db.SetConnMaxLifetime(0)

	return db
}

// Handler-functie om reserveringen toe te voegen (POST)
func (h Handler) PostReservation(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Guest       models.Guest       `json:"guest"`
		Reservation models.Reservation `json:"reservation"`
		Payment     models.Payment     `json:"payment"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Ongeldig JSON-formaat", http.StatusBadRequest)
		return
	}

	// Transactie starten
	envList := services.LoadEnv()
	db, nil := services.InitializeDatabase(envList)
	tx, err := db.Begin()
	if err != nil {
		http.Error(w, "Fout bij starten van transactie", http.StatusInternalServerError)
		return
	}

	defer func() {
		if err != nil {
			tx.Rollback()
		} else {
			tx.Commit()
		}
	}()

	// Controleer of gast al bestaat
	var guestID int
	err = tx.QueryRow(`SELECT id FROM guests WHERE email = ? AND deleted_at IS NULL`, input.Guest.Email).Scan(&guestID)
	if err == sql.ErrNoRows {
		// Voeg gast toe als deze niet bestaat
		guestQuery := `INSERT INTO guests (first_name, last_name, email, created_at) VALUES (?, ?, ?, NOW())`
		res, err := tx.Exec(guestQuery, input.Guest.FirstName, input.Guest.LastName, input.Guest.Email)
		if err != nil {
			http.Error(w, "Fout bij toevoegen gast", http.StatusInternalServerError)
			return
		}
		guestID64, err := res.LastInsertId()
		if err != nil {
			http.Error(w, "Fout bij ophalen van gast-ID", http.StatusInternalServerError)
			return
		}
		guestID = int(guestID64)
	} else if err != nil {
		http.Error(w, "Fout bij controleren van gast", http.StatusInternalServerError)
		return
	}

	// Voeg reservering toe
	reservationQuery := `INSERT INTO reservations (guest_id, accommodation_id, checkin, checkout, created_at) VALUES (?, ?, ?, ?, NOW())`
	res, err := tx.Exec(reservationQuery, guestID, input.Reservation.AccommodationID, input.Reservation.CheckIn, input.Reservation.CheckOut)
	if err != nil {
		http.Error(w, "Fout bij toevoegen reservering", http.StatusInternalServerError)
		return
	}

	reservationID64, err := res.LastInsertId()
	if err != nil {
		http.Error(w, "Fout bij ophalen van reservering-ID", http.StatusInternalServerError)
		return
	}
	reservationID := int(reservationID64)

	// Voeg betaling en line-items toe
	paymentQuery := `INSERT INTO payments (method_id, total_price, created_at) VALUES (?, 0, NOW())`
	res, err = tx.Exec(paymentQuery, input.Payment.MethodID)
	if err != nil {
		http.Error(w, "Fout bij toevoegen betaling", http.StatusInternalServerError)
		return
	}

	paymentID64, err := res.LastInsertId()
	if err != nil {
		http.Error(w, "Fout bij ophalen van betaling-ID", http.StatusInternalServerError)
		return
	}
	paymentID := int(paymentID64)

	totalPrice := 0.0
	for _, item := range input.Payment {
		var price float64
		priceQuery := `SELECT price FROM price_categories WHERE id = ? AND deleted_at IS NULL`
		err = tx.QueryRow(priceQuery, item).Scan(&price)
		if err == sql.ErrNoRows {
			http.Error(w, "Ongeldige category_id", http.StatusBadRequest)
			return
		} else if err != nil {
			http.Error(w, "Fout bij ophalen van prijscategorie", http.StatusInternalServerError)
			return
		}

		totalPrice += price * float64(item)

		lineItemQuery := `INSERT INTO line_items (payment_id, category_id, quantity, created_at) VALUES (?, ?, ?, NOW())`
		_, err = tx.Exec(lineItemQuery, paymentID, item, item.Quantity)
		if err != nil {
			http.Error(w, "Fout bij toevoegen line-item", http.StatusInternalServerError)
			return
		}
	}

	// Update totale prijs in betaling
	updatePaymentQuery := `UPDATE payments SET total_price = ? WHERE id = ?`
	_, err = tx.Exec(updatePaymentQuery, totalPrice, paymentID)
	if err != nil {
		http.Error(w, "Fout bij bijwerken van betaling", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":        "Reservering succesvol toegevoegd",
		"reservation_id": reservationID,
	})
}

// Handler-functie om reserveringen op te halen (GET)
func (h Handler) GetReservations(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Alleen GET-method toegestaan", http.StatusMethodNotAllowed)
		return
	}

	// SQL-query om alle reserveringen op te halen
	query := `
		SELECT 
			r.id, g.first_name, g.last_name, 
			a.type AS accommodation_type, 
			r.checkin, r.checkout, p.total_price
		FROM reservations r
		JOIN guests g ON r.guest_id = g.id
		JOIN accommodations ac ON r.accommodation_id = ac.id
		JOIN accommodation_types a ON ac.accommodation_type_id = a.id
		JOIN payments p ON r.id = p.id
		WHERE r.deleted_at IS NULL`
	rows, err := db.Query(query)
	if err != nil {
		http.Error(w, "Fout bij ophalen van reserveringen", http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	// Resultaten opslaan in een slice
	var reservations []map[string]interface{}
	for rows.Next() {
		var (
			reservationID                                             int
			firstName, lastName, accommodationType, checkin, checkout string
			totalPrice                                                float64
		)
		if err := rows.Scan(&reservationID, &firstName, &lastName, &accommodationType, &checkin, &checkout, &totalPrice); err != nil {
			http.Error(w, "Fout bij verwerken van gegevens", http.StatusInternalServerError)
			return
		}
		reservations = append(reservations, map[string]interface{}{
			"reservation_id": reservationID,
			"guest_name":     fmt.Sprintf("%s %s", firstName, lastName),
			"accommodation":  accommodationType,
			"checkin":        checkin,
			"checkout":       checkout,
			"total_price":    totalPrice,
		})
	}

	// JSON-response retourneren
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(reservations)
}
