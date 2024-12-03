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

	dsn := buildDSN(
		"root",      // Name
		dbPassword,  // db password
		"localhost", //
		"3306",      // port
	)

	initializeDatabase(
		dsn, 						
		"dreamchasers", // dbName
		true,						// multiStatements
	)
	
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

func initializeDatabase(dsn, dbName string, multiStatements bool) {
	// ==== DB Connection ==== \\
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	_, err = db.Exec(fmt.Sprintf("CREATE DATABASE IF NOT EXISTS %s", dbName))
	if err != nil {
		log.Fatal(err)
	}

	// Reconnect to the newly created database
	dsnWithDB := fmt.Sprintf("%s%s", dsn, dbName)

	if multiStatements {
		dsnWithDB = dsnWithDB + "?multiStatements=true"
	}

	db, err = sql.Open("mysql", dsnWithDB)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// ==== Migrations ==== \\
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
}

func buildDSN(name, password, host, port string) string {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/", name, password, host, port)

	return dsn
}
