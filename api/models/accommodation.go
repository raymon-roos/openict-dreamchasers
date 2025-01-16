package models

type Coordinate struct {
	Long float32
	Lat  float32
}

type Accommodation struct {
	ID                  int               `json:"id,omitempty"`
	AccommodationTypeID int               `json:"accommodation_type_id,omitempty"`
	AccommodationNumber int               `json:"accommodation_number,omitempty"`
	Coordinate          Coordinate        `json:"coordinate,omitempty"`
	CreatedAt           string            `json:"created_at,omitempty"`
	UpdatedAt           string            `json:"updated_at,omitempty"`
	DeletedAt           string            `json:"deleted_at,omitempty"`
	Type                AccommodationType `json:"type,omitempty"`
}
