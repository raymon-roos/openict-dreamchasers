package models

type LineItem struct {
	ID         string `json:"id,omitempty"`
	PaymentID  string `json:"payment_id,omitempty"`
	CategoryID string `json:"category_id,omitempty"`
	Quantity   string `json:"quantity,omitempty"`
	CreatedAt  string `json:"created_at,omitempty"`
	UpdatedAt  string `json:"updated_at,omitempty"`
	DeletedAt  string `json:"deleted_at,omitempty"`
}
