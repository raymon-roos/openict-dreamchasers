package models

type priceCategory struct {
	ID           int64   `json:"id,omitempty"`
	CategoryName string  `json:"category_name,omitempty"`
	Price        float32 `json:"price,omitempty"`
	CreatedAt    string  `json:"created_at,omitempty"`
	UpdatedAt    string  `json:"updated_at,omitempty"`
	DeletedAt    string  `json:"deleted_at,omitempty"`
}
