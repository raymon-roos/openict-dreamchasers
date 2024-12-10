package main

import (
	// "dreamchasers/internal/services"
	"dreamchasers/internal/https"
	"net/http"
)

func main() {
	// ====--- DON'T DELETE THIS ---====
	// envList := services.LoadEnv()

	// db, err := services.InitializeDatabase(envList)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// defer db.Close()

	// db.SetMaxOpenConns(25)
	// db.SetMaxIdleConns(25)
	// db.SetConnMaxLifetime(0)

	// services.DbMigration(db)
	// ====--- DON'T DELETE THIS ---====

	// ==== HTTP ROUTING ====
	handlerList := https.GetHandlers()

	routeList := https.PathFromHandler(handlerList)

	// In short sends all request to CallHandler. Needed for dynamic routing
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path[1:] // Remove leading slash
		https.CallHandler(routeList, path, w, r)
	})

	http.ListenAndServe(":8080", nil)

}
