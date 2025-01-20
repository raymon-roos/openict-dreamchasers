package handlers

import (
	"log"
	"net/http"
)

type Handler struct{}

func httpError(w http.ResponseWriter, msg string) {
	log.Println(msg)
	http.Error(w, msg, 500)
}
