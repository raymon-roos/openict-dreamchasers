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

	db, err := initializeDatabase(
		"root",
		dbPassword,
		"localhost",
		"3306",         // port
		"dreamchasers", // dbname
		true,           // multiStatements
	)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(25)
	db.SetConnMaxLifetime(0)

	dbMigration(db)

	defer db.Close()

	log.Println("Migrations applied successfully!")
}

func connectDB(dsn string) (*sql.DB, error) {
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	// Verify the connection
	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}

func createDatabaseIfNotExists(db *sql.DB, dbName string) error {
	query := fmt.Sprintf("CREATE DATABASE IF NOT EXISTS %s", dbName)
	_, err := db.Exec(query)
	return err
}

func initializeDatabase(name, password, host, port, dbName string, multiStatements bool) (*sql.DB, error) {
	baseDSN := fmt.Sprintf("%s:%s@tcp(%s:%s)/", name, password, host, port)
	db, err := connectDB(baseDSN)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	err = createDatabaseIfNotExists(db, dbName)
	if err != nil {
		return nil, err
	}

	dsnWithDB := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", name, password, host, port, dbName)
	if multiStatements {
		dsnWithDB += "?multiStatements=true"
	}

	return connectDB(dsnWithDB)
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
