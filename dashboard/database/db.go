package database

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

// var DB *sql.DB

func InitDB(db *sql.DB) {
	var err error
	// Verbind met de database
	db, err = sql.Open("mysql", "user:password@tcp(localhost:3306)/your_database")
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Test de verbinding
	if err = db.Ping(); err != nil {
		log.Fatal("Failed to ping database:", err)
	}

	log.Println("Database connected successfully")
}
