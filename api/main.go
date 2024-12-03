package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/mysql"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/joho/godotenv"
)

func main() {
	// Load env file
	err := godotenv.Load(".env")
	if err != nil {
		log.Println("No .env file found")
	}

	// Get the database password from the environment variable
	dbPassword := os.Getenv("DB_Password")
	if dbPassword == "" {
		log.Fatal("DB_Password environment variable not set")
	}

	// Open a connection to the database
	dsn := fmt.Sprintf("root:%s@tcp(localhost:3306)/dreamchasers?multiStatements=true", dbPassword)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Run migrations
	driver, err := mysql.WithInstance(db, &mysql.Config{})
	if err != nil {
		log.Fatal(err)
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file://migrations",
		"mysql", driver)
	if err != nil {
		log.Fatal(err)
	}

	// Apply migrations
	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		log.Printf("Migration error: %v", err)
		if err == migrate.ErrNoChange {
			log.Println("No change in migrations")
		} else {
			log.Fatal(err)
		}
	}

	log.Println("Migrations applied successfully!")

	// Query the database
	// rows, err := db.Query("SELECT id, status_name FROM camp_status")
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// defer rows.Close()

	// // This can be removed
	// fmt.Println("hi")

	// // Iterate through the result set
	// for rows.Next() {
	// 	var id string
	// 	var statusName string
	// 	err := rows.Scan(&id, &statusName)
	// 	if err != nil {
	// 		log.Fatal(err)
	// 	}

	// 	fmt.Println(id, statusName)
	// }

	// // Check for errors from iterating over rows
	// if err := rows.Err(); err != nil {
	// 	log.Fatal(err)
	// }
}
