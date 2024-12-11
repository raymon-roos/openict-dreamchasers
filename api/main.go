package main

import (
	"dreamchasers/internal/https"
	"dreamchasers/internal/services"
	"log"
	"net/http"
)

func main() {

	envList := services.LoadEnv()

	db, err := services.InitializeDatabase(envList)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(25)
	db.SetConnMaxLifetime(0)

	services.DbMigration(db)

	// ==== HTTP ROUTING ====
	handlerList := https.ListHandlerMethods()

	routeList := https.GenerateRoutesFromHandlers(handlerList)

	// In short sends all request to CallHandler. Needed for dynamic routing
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path[1:] // Remove leading slash
		https.ExecuteRouteHandler(routeList, path, w, r)
	})

	http.ListenAndServe(":8080", nil)

}
