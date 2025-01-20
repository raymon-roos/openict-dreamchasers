package models

type Reservation struct {
	ID              int64         `json:"id,omitempty"`
	GuestID         int64         `json:"guest_id,omitempty"`
	PaymentID       int64         `json:"payment_id,omitempty"`
	AccommodationID int64         `json:"accommodation_id,omitempty"`
	CheckIn         string        `json:"check_in,omitempty"`
	CheckOut        string        `json:"check_out,omitempty"`
	CreatedAt       string        `json:"created_at,omitempty"`
	UpdatedAt       string        `json:"updated_at,omitempty"`
	DeletedAt       string        `json:"deleted_at,omitempty"`
	CanceledAt      string        `json:"canceled_at,omitempty"`
	Guest           Guest         `json:"guest,omitempty"`
	Payment         Payment       `json:"payment,omitempty"`
	Accommodation   Accommodation `json:"accommodations,omitempty"`
}
