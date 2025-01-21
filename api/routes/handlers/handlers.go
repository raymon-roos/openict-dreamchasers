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
