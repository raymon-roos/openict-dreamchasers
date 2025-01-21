package database

type Reservation struct {
	ID        int
	GuestName string
	CheckIn   string
	CheckOut  string
	Status    string
}
