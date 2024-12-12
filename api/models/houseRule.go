package models

type HouseRule struct {
	ID        int    `json:"id,omitempty"`
	Sort      int    `json:"sort,omitempty"`
	RuleText  string `json:"rule_text,omitempty"`
	CreatedAt string `json:"created_at,omitempty"`
	UpdatedAt string `json:"updated_at,omitempty"`
	DeletedAt string `json:"deleted_at,omitempty"`
}
