package models

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
