package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var db *sql.DB

// Structs voor database-tabellen
type Reservation struct {
	GuestID         int     `json:"guest_id"`
	AccommodationID int     `json:"accommodation_id"`
	Checkin         string  `json:"checkin"`
	Checkout        string  `json:"checkout"`
	TotalPrice      float64 `json:"total_price,omitempty"`
}

type Guest struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
}

type Payment struct {
	MethodID  int       `json:"method_id"`
	LineItems []LineItem `json:"line_items"`
}

type LineItem struct {
	CategoryID int `json:"category_id"`
	Quantity   int `json:"quantity"`
}

// Functie om databaseverbinding op te zetten
func initDB() {
	var err error

	// Laad de .env-variabelen
	err = godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	// Haal de gegevens op uit de omgevingsvariabelen
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	// Maak de connection string
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPassword, dbHost, dbPort, dbName)

	// Open een verbinding met de database
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Fout bij verbinden met database: %v", err)
	}

	// Controleer of de verbinding werkt
	if err := db.Ping(); err != nil {
		log.Fatalf("Kan geen verbinding maken met database: %v", err)
	}

	fmt.Println("Succesvol verbonden met database!")
}

// Handler-functie om reserveringen toe te voegen (POST)
func addReservation(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Alleen POST-method toegestaan", http.StatusMethodNotAllowed)
		return
	}

	var input struct {
		Guest      Guest      `json:"guest"`
		Reservation Reservation `json:"reservation"`
		Payment    Payment    `json:"payment"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Ongeldig JSON-formaat", http.StatusBadRequest)
		return
	}

	// Transactie starten
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
	res, err := tx.Exec(reservationQuery, guestID, input.Reservation.AccommodationID, input.Reservation.Checkin, input.Reservation.Checkout)
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
	for _, item := range input.Payment.LineItems {
		var price float64
		priceQuery := `SELECT price FROM price_categories WHERE id = ? AND deleted_at IS NULL`
		err = tx.QueryRow(priceQuery, item.CategoryID).Scan(&price)
		if err == sql.ErrNoRows {
			http.Error(w, "Ongeldige category_id", http.StatusBadRequest)
			return
		} else if err != nil {
			http.Error(w, "Fout bij ophalen van prijscategorie", http.StatusInternalServerError)
			return
		}

		totalPrice += price * float64(item.Quantity)

		lineItemQuery := `INSERT INTO line_items (payment_id, category_id, quantity, created_at) VALUES (?, ?, ?, NOW())`
		_, err = tx.Exec(lineItemQuery, paymentID, item.CategoryID, item.Quantity)
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
		"message": "Reservering succesvol toegevoegd",
		"reservation_id": reservationID,
	})
}

// Handler-functie om reserveringen op te halen (GET)
func getReservations(w http.ResponseWriter, r *http.Request) {
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
			reservationID int
			firstName, lastName, accommodationType, checkin, checkout string
			totalPrice float64
		)
		if err := rows.Scan(&reservationID, &firstName, &lastName, &accommodationType, &checkin, &checkout, &totalPrice); err != nil {
			http.Error(w, "Fout bij verwerken van gegevens", http.StatusInternalServerError)
			return
		}
		reservations = append(reservations, map[string]interface{}{
			"reservation_id":  reservationID,
			"guest_name":      fmt.Sprintf("%s %s", firstName, lastName),
			"accommodation":   accommodationType,
			"checkin":         checkin,
			"checkout":        checkout,
			"total_price":     totalPrice,
		})
	}

	// JSON-response retourneren
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(reservations)
}

func main() {
	// Verbind met de database
	initDB()
	defer db.Close()

	// Stel routes in
	http.HandleFunc("/add-reservation", addReservation)
	http.HandleFunc("/get-reservations", getReservations)

	fmt.Println("Server draait op http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
