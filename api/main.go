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

	err := godotenv.Load(".env")
	if err != nil {
		log.Println("No .env file found")
	}

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

	db, err := initializeDatabase(
		dsn,
		"dreamchasers", // dbName
		true,           // multiStatements
	)
	if err != nil {
		log.Fatal(err)
	}

	// ==== DB connection conf ==== \\
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(25)
	db.SetConnMaxLifetime(0)

	dbMigration(db)

	defer db.Close()

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

func initializeDatabase(dsn, dbName string, multiStatements bool) (*sql.DB, error) {

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	_, err = db.Exec(fmt.Sprintf("CREATE DATABASE IF NOT EXISTS %s", dbName))
	if err != nil {
		return nil, err
	}

	// Reconnect to db
	dsnWithDB := fmt.Sprintf("%s%s", dsn, dbName)

	if multiStatements {
		dsnWithDB = dsnWithDB + "?multiStatements=true"
	}

	db, err = sql.Open("mysql", dsnWithDB)
	if err != nil {
		return nil, err
	}

	return db, nil
}

func buildDSN(name, password, host, port string) string {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/", name, password, host, port)

	return dsn
}

func dbMigration(db *sql.DB) (*sql.DB, error) {

	driver, err := mysql.WithInstance(db, &mysql.Config{})
	if err != nil {
		return nil, err
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file://migrations",
		"mysql", driver)
	if err != nil {
		return nil, err
	}

	// Apply migrations
	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		log.Printf("Migration error: %v", err)
		if err == migrate.ErrNoChange {
			log.Println("No change in migrations")
		} else {
			return nil, err
		}
	}

	return nil, err
}
