package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	// Open a connection to the database
	db, err := sql.Open("mysql", "root:-PasswordHere-@tcp(localhost:3306)/database-booking")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Query the database
	rows, err := db.Query("SELECT id, status_name FROM camp_status")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	fmt.Println("hi")
	// Iterate through the result set
	for rows.Next() {
		var id string
		var campNumber string
		err := rows.Scan(&id, &campNumber)
		if err != nil {
			log.Fatal(err)
		}

		fmt.Println(id, campNumber)
	}

	// Check for errors from iterating over rows
	if err := rows.Err(); err != nil {
		log.Fatal(err)
	}
}
