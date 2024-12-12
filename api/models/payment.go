package models

type Payment struct {
	ID          string  `json:"id,omitempty"`
	MethodID    string  `json:"method_id,omitempty"`
	StatusID    string  `json:"status_id,omitempty"`
	Totalprice  float32 `json:"totalprice,omitempty"`
	CompletedAt string  `json:"completed_at,omitempty"`
	CreatedAt   string  `json:"created_at,omitempty"`
	UpdatedAt   string  `json:"updated_at,omitempty"`
	DeletedAt   string  `json:"deleted_at,omitempty"`
}
