package models

type Reservation struct {
	ID              int    `json:"id,omitempty"`
	GuestID         int    `json:"guest_id,omitempty"`
	PaymentID       int    `json:"payment_id,omitempty"`
	AccommodationID int    `json:"accommodation_id,omitempty"`
	CheckIn         string `json:"check_in,omitempty"`
	CheckOut        string `json:"check_out,omitempty"`
	CreatedAt       string `json:"created_at,omitempty"`
	UpdatedAt       string `json:"updated_at,omitempty"`
	DeletedAt       string `json:"deleted_at,omitempty"`
	CanceledAt      string `json:"canceled_at,omitempty"`
}
