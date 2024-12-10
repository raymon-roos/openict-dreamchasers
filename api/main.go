package main

import (
	// "dreamchasers/internal/services"
	"dreamchasers/internal/https"
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

	handlerList := https.GetHandlers()

	https.PathFromHandler(handlerList)

}
