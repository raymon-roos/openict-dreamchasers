package handlers

import (
	"fmt"
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

func (h Handler) PostReservation(w http.ResponseWriter, r *http.Request) {
	// TODO @Isa, hier gaat een verzoek van de fronten binnen komen, met json data.
	// Kan jij de data uit die json halen en inserten in de database?
	// Waarschijnlijk hep je iets zoals "json marshaling" nodig. Alle structs zijn al
	// gedefinieerd onder het mapje `models/`. Succes :D
}
