package handlers

import (
	"dreamchasers/models"
	"encoding/json"
	"fmt"
	"net/http"
)

func (h Handler) PostReservation(w http.ResponseWriter, r *http.Request) {
	var reservation models.Reservation
	json.NewDecoder(r.Body).Decode(&reservation)

	addressId, err := reservation.Guest.Address.Insert()
	if err != nil {
		httpError(w, fmt.Sprintf("Failed to insert 'address':\n%+v", err))
		return
	}
	reservation.Guest.AddressID = addressId

	guestId, err := reservation.Guest.Insert()
	if err != nil {
		httpError(w, fmt.Sprintf("Failed to insert 'guest':\n%+v", err))
		return
	}

	reservation.GuestID = guestId
	insertReservation()
}

func insertReservation() {
	// TODO
}
