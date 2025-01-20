package models

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
}
