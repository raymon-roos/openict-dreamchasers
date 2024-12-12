package models

type Country struct {
	IsoCode string `json:"iso_code,omitempty"`
	Name    string `json:"name,omitempty"`
}
