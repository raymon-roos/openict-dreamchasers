package models

type Guest struct {
	ID          string `json:"id,omitempty"`
	FirstName   string `json:"first_name,omitempty"`
	MiddleName  string `json:"middle_name,omitempty"`
	LastName    string `json:"last_name,omitempty"`
	DateOfBirth string `json:"date_of_birth,omitempty"`
	Email       string `json:"email,omitempty"`
	PhoneNumber string `json:"phone_number,omitempty"`
	AddressID   string `json:"address_id,omitempty"`
	CreatedAt   string `json:"created_at,omitempty"`
	UpdatedAt   string `json:"updated_at,omitempty"`
	DeletedAt   string `json:"deleted_at,omitempty"`
}
