package models

import (
	"dreamchasers/services"
	"errors"
)

type Address struct {
	ID          int64  `json:"id,omitempty"`
	CountryCode string `json:"country_code,omitempty"`
	Postcode    string `json:"postcode,omitempty"`
	City        string `json:"city,omitempty"`
	Street      string `json:"street,omitempty"`
	Number      string `json:"number,omitempty"`
	Suffix      string `json:"suffix,omitempty"`
	CreatedAt   string `json:"created_at,omitempty"`
	UpdatedAt   string `json:"updated_at,omitempty"`
	DeletedAt   string `json:"deleted_at,omitempty"`
}

func (a Address) Insert() (int64, error) {
	if err := a.Validate(); err != nil {
		return -1, err
	}

	db, err := services.InitializeDatabase(services.LoadEnv())
	if err != nil {
		return -1, err
	}

	result, err := db.Exec(
		`INSERT INTO addresses (country_code, postcode, city, street, number, suffix)
		VALUES (?, ?, ?, ?, ?, ?)`,
		a.CountryCode, a.Postcode, a.City, a.Street, a.Number, a.Suffix,
	)
	if err != nil {
		return -1, err
	}

	return result.LastInsertId()
}

func (a Address) Validate() error {
	if a.CountryCode == "" {
		return errors.New("Missing country code")
	}
	if a.Postcode == "" {
		return errors.New("Missing post code")
	}
	if a.City == "" {
		return errors.New("Missing city")
	}
	if a.Street == "" {
		return errors.New("Missing street")
	}
	if a.Number == "" {
		return errors.New("Missing Number")
	}

	return nil
}
