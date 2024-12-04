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

type EnvConfig struct {
	User     string
	Password string
	Host     string
	Port     string
	DBName   string
}

func main() {
	envList := loadEnv()

	db, err := initializeDatabase(envList)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(25)
	db.SetConnMaxLifetime(0)

	dbMigration(db)

	log.Println("db successfully!")
}

func loadEnv() EnvConfig {
	err := godotenv.Load(".env")
	if err != nil {
		log.Println("No .env file found!\033[31m")
	}

	config := EnvConfig{
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		DBName:   os.Getenv("DB_NAME"),
	}

	return config
}

// ==== DB Connection ====
func initializeDatabase(env EnvConfig) (*sql.DB, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/", env.User, env.Password, env.Host, env.Port)
	db, err := connectDB(dsn)
	if err != nil {
		return nil, err
	}

	err = createDatabaseIfNotExists(db, env.DBName)
	if err != nil {
		return nil, err
	}

	// This should not be hardcoded. (multiStatements)
	dsnWithDB := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?multiStatements=true", env.User, env.Password, env.Host, env.Port, env.DBName)

	return connectDB(dsnWithDB)
}

func connectDB(dsn string) (*sql.DB, error) {
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}

func createDatabaseIfNotExists(db *sql.DB, dbname string) error {
	query := fmt.Sprintf("CREATE DATABASE IF NOT EXISTS %s", dbname)
	_, err := db.Exec(query)
	return err
}

func dbMigration(db *sql.DB) error {
	driver, err := mysql.WithInstance(db, &mysql.Config{})
	if err != nil {
		return err
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file://migrations",
		"mysql", driver)
	if err != nil {
		return err
	}

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		log.Printf("Migration error: %v", err)
		if err == migrate.ErrNoChange {
			log.Println("No change in migrations")
		}
	}

	return err
}
