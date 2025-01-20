package models

type LineItem struct {
	ID         int64  `json:"id,omitempty"`
	PaymentID  int64  `json:"payment_id,omitempty"`
	CategoryID int64  `json:"category_id,omitempty"`
	Quantity   string `json:"quantity,omitempty"`
	CreatedAt  string `json:"created_at,omitempty"`
	UpdatedAt  string `json:"updated_at,omitempty"`
	DeletedAt  string `json:"deleted_at,omitempty"`
}
