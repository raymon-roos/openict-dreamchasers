package models

import (
	"dreamchasers/services"
	"errors"
	"fmt"
	"strings"
	"time"
)

type Guest struct {
	ID          int64   `json:"id,omitempty"`
	FirstName   string  `json:"first_name,omitempty"`
	MiddleName  string  `json:"middle_name,omitempty"`
	LastName    string  `json:"last_name,omitempty"`
	DateOfBirth string  `json:"date_of_birth,omitempty"`
	Email       string  `json:"email,omitempty"`
	PhoneNumber string  `json:"phone_number,omitempty"`
	AddressID   int64   `json:"address_id,omitempty"`
	CreatedAt   string  `json:"created_at,omitempty"`
	UpdatedAt   string  `json:"updated_at,omitempty"`
	DeletedAt   string  `json:"deleted_at,omitempty"`
	Address     Address `json:"address,omitempty"`
}

func (g Guest) Insert() (int64, error) {
	if err := g.Validate(); err != nil {
		return -1, err
	}

	db, err := services.InitializeDatabase(services.LoadEnv())
	if err != nil {
		return -1, err
	}

	dob, err := time.Parse("01-02-2006", g.DateOfBirth)
	if err != nil {
		return -1, err
	}

	result, err := db.Exec(
		`INSERT INTO guests (first_name, middle_name, last_name, date_of_birth, email, phone_number, address_id)
		VALUES (?, ?, ?, ?, ?, ?, ?)`,
		g.FirstName, g.MiddleName, g.LastName, dob, g.Email, g.PhoneNumber, g.AddressID,
	)
	if err != nil {
		return -1, err
	}

	return result.LastInsertId()
}

func (g Guest) Validate() error {
	if g.AddressID <= 0 {
		return errors.New("invalid address ID")
	}
	if g.FirstName == "" || g.LastName == "" {
		return errors.New("Missing first or last name")
	}
	if _, err := time.Parse("01-02-2006", g.DateOfBirth); err != nil {
		return errors.New(fmt.Sprintf("Invalid date of birth\n%+v", err))
	}
	if g.Email == "" || !strings.Contains(g.Email, "@") {
		return errors.New("invalid email")
	}

	return nil
}
