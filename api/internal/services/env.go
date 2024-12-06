package services

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type EnvConfig struct {
	User     string
	Password string
	Host     string
	Port     string
	DBName   string
}

func LoadEnv() EnvConfig {
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
