package routes

import (
	"fmt"
	"net/http"
)

// - Name Format: {Method}+{WhatItDoes/Name}
type Handler struct{}

// TEST function | Just remove this when done
func (h Handler) getOla(w http.ResponseWriter, r *http.Request) {
	secret := "Ola"
	fmt.Println(secret)
	w.Write([]byte(secret))
}

// TEST function | Just remove this when done
func (h Handler) deleteOlaBolla(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Removed Ola (ㆆ_ㆆ)")
}
