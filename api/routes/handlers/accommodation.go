package handlers

import (
	"dreamchasers/models"
	"dreamchasers/services"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func (h Handler) GetAccommodations(w http.ResponseWriter, r *http.Request) {
	accommodations, err := queryAccommodations()
	if err != nil {
		msg := fmt.Sprintf("Failed to retrieve 'accommodations'\n%+v", err)
		log.Println(msg)
		http.Error(w, msg, 500)
		return
	}
	json.NewEncoder(w).Encode(accommodations)
}

func queryAccommodations() ([]models.Accommodation, error) {
	db, err := services.InitializeDatabase(services.LoadEnv())
	if err != nil {
		log.Println(fmt.Sprintf("Failed to query 'accommodations'\n %+v", err))
		return nil, err
	}

	rows, err := db.Query(`
		SELECT a.accommodation_number, ST_X(a.coordinate) as longitude, ST_Y(a.coordinate) as lattitude, at.type, at.price
		FROM accommodations a
		left join accommodation_types at
		on a.accommodation_type_id = at.id;
	`)
	if err != nil {
		log.Println(fmt.Sprintf("Failed to query 'accommodations'\n %+v", err))
		return nil, err
	}
	defer rows.Close()

	var accommodations []models.Accommodation

	for rows.Next() {
		var a models.Accommodation
		err := rows.Scan(&a.AccommodationNumber, &a.Coordinate.Long, &a.Coordinate.Lat, &a.Type.Type, &a.Type.Price)
		if err != nil {
			log.Println(fmt.Sprintf("Failed to query 'accommodations': %+v ", err))
			return nil, err
		}
		accommodations = append(accommodations, a)
	}

	if err := rows.Err(); err != nil {
		log.Println(fmt.Sprintf("%+v ", err))
		return nil, err
	}

	return accommodations, nil
}
