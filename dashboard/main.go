package main

import (
	"dreamchasers/services"
	"log"
)

type Reservation struct {
	ReservationID int    `json:"reservation_id"`
	CheckIn       string `json:"check_in"`
	CheckOut      string `json:"check_out"`
	FirstName     string `json:"first_name"`
	LastName      string `json:"last_name"`
	Email         string `json:"email"`
}

func main() {
	reservations, err := getReservations()
	if err != nil {
		log.Fatal(err)
	}

	for _, r := range reservations {
		log.Printf("Reservation: %v\n", r)
	}
}

func getReservations() ([]Reservation, error) {
	db, err := services.InitializeDatabase(services.LoadEnv())
	if err != nil {
		return nil, err
	}

	rows, err := db.Query(`	
		SELECT
            reservations.id AS reservation_id,
            reservations.checkin AS check_in,
            reservations.checkout AS check_out,
            guests.first_name AS first_name,
            guests.last_name AS last_name,
            guests.email AS email
        FROM
            reservations
        INNER JOIN
            guests
        ON
            reservations.guest_id = guests.id;`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var reservations []Reservation
	for rows.Next() {
		var r Reservation
		if err := rows.Scan(&r.ReservationID, &r.CheckIn, &r.CheckOut, &r.FirstName, &r.LastName, &r.Email); err != nil {
			log.Println("Error scanning row:", err)
			continue
		}
		reservations = append(reservations, r)
	}

	return reservations, nil
}
