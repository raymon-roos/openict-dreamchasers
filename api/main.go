package main

import (
	"log"

	"dreamchasers/internal/services"
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

	log.Println("db successfully!")
}
