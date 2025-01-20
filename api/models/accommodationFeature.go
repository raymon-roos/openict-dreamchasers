package models

type AccommodationFeature struct {
	ID                  int64   `json:"id,omitempty"`
	AccommodationTypeID int64   `json:"accommodation_type_id,omitempty"`
	Description         string  `json:"description,omitempty"`
	Price               float32 `json:"price,omitempty"`
	CreatedAt           string  `json:"created_at,omitempty"`
	UpdatedAt           string  `json:"updated_at,omitempty"`
	DeletedAt           string  `json:"deleted_at,omitempty"`
}
