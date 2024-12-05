package models

type AccommodationType struct {
	ID        int     `json:"id,omitempty"`
	Type      string  `json:"type,omitempty"`
	MaxGuests string  `json:"max_guests,omitempty"`
	Price     float32 `json:"price,omitempty"`
	CreatedAt string  `json:"created_at,omitempty"`
	UpdatedAt string  `json:"updated_at,omitempty"`
	DeletedAt string  `json:"deleted_at,omitempty"`
}
