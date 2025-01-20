package models

type Coordinate struct {
	Long float32 `json:"long,omitempty"`
	Lat  float32 `json:"lat,omitempty"`
}

type Accommodation struct {
	ID                  int64             `json:"id,omitempty"`
	AccommodationTypeID int64             `json:"accommodation_type_id,omitempty"`
	AccommodationNumber int               `json:"accommodation_number,omitempty"`
	Coordinate          Coordinate        `json:"coordinate,omitempty"`
	CreatedAt           string            `json:"created_at,omitempty"`
	UpdatedAt           string            `json:"updated_at,omitempty"`
	DeletedAt           string            `json:"deleted_at,omitempty"`
	Type                AccommodationType `json:"type,omitempty"`
}
