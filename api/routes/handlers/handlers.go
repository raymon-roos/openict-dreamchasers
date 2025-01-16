package handlers

import (
	"dreamchasers/services"
	"fmt"
	"log"
	"net/http"
)

// - Name Format: {Method}+{WhatItDoes/Name}
type Handler struct{}

// TEST function | Just remove this when done
func (h Handler) GetOla(w http.ResponseWriter, r *http.Request) {
	secret := "Ola"
	fmt.Println(secret)
	w.Write([]byte(secret))
}

// func (h Handler) PostReservation(w http.ResponseWriter, r *http.Request) {
// TODO @Isa, hier gaat een verzoek van de fronten binnen komen, met json data.
// Kan jij de data uit die json halen en inserten in de database?
// Waarschijnlijk hep je iets zoals "json marshaling" nodig. Alle structs zijn al
// gedefinieerd onder het mapje `models/`. Succes :D
//}

func (h Handler) GetCountries(w http.ResponseWriter, r *http.Request) {

	envList := services.LoadEnv()
	db, err := services.InitializeDatabase(envList)
	if err != nil {
		log.Fatal(err)
	}

	if r.Method != http.MethodGet {
		http.Error(w, "Alleen GET-method toegestaan", http.StatusMethodNotAllowed)
		return
	}

	query := `SELECT id, name FROM countries WHERE deleted_at IS NULL`
	rows, err := db.Query(query)
	if err != nil {
		http.Error(w, "Fout bij ophalen van landen", http.StatusInternalServerError)
		return
	}
	defer rows.Close()



}

func (h Handler) GetAdress(w http.ResponseWriter, r *http.Request) { 
		envList := services.LoadEnv()
		db, err := services.InitializeDatabase(envList)
		if err != nil {
			log.Fatal(err)
		}
	if r.Method != http.MethodGet {
		http.Error(w, "Alleen GET-method toegestaan", http.StatusMethodNotAllowed)
		return
	}

	query := `SELECT * FROM Adress WHERE deleted_at IS NULL`
	rows, err := db.Query(query)
	if err != nil {
		http.Error(w, "Fout bij ophalen van het adress", http.StatusInternalServerError)
		return
	}

	defer rows.Close()
}







func (h Handler) GetAdmin(w http.ResponseWriter, r *http.Request) { 
	envList := services.LoadEnv()
	db, err := services.InitializeDatabase(envList)

	if err != nil {
		log.Fatal(err)
	}

	if r.Method != http.MethodGet {
		http.Error(w, "Alleen GET-method toegestaan", http.StatusMethodNotAllowed)
		return
    }

	query := `SELECT * FROM Admin WHERE deleted_at IS NULL`
	rows, err := db.Query(query)
	if err != nil {
		http.Error(w, "Fout bij ophalen van de admin", http.StatusInternalServerError)
		return
	}

	defer rows.Close()
}






func (h Handler) GetGuest(w http.ResponseWriter, r *http.Request) {
		envList := services.LoadEnv()
		db, err := services.InitializeDatabase(envList)
	if err != nil {
		log.Fatal(err)
		}
	if r.Method != http.MethodGet {
	http.Error(w, "Alleen GET-method toegestaan", http.StatusMethodNotAllowed)
	return

	}

	query := `SELECT * FROM Admin WHERE deleted_at IS NULL`
	rows, err := db.Query(query)
	if err != nil {
	http.Error(w, "Fout bij ophalen van de guest", http.StatusInternalServerError)
	return

	}

	defer rows.Close()

}






func (h Handler) GetPriceCategory(w http.ResponseWriter, r *http.Request) {
		envList := services.LoadEnv()
		db, err := services.InitializeDatabase(envList)
	if err != nil {
		log.Fatal(err)
		}
	if r.Method != http.MethodGet {
	http.Error(w, "Alleen GET-method toegestaan", http.StatusMethodNotAllowed)
	return

	}

	query := `SELECT * FROM Admin WHERE deleted_at IS NULL`
	rows, err := db.Query(query)
	if err != nil {
	http.Error(w, "Fout bij ophalen van de pricecategory", http.StatusInternalServerError)
	return

	}

	defer rows.Close()


}




func (h Handler) GetLineItem(w http.ResponseWriter, r *http.Request) {
		envList := services.LoadEnv()
		db, err := services.InitializeDatabase(envList)
	if err != nil {
		log.Fatal(err)
		}
	if r.Method != http.MethodGet {
	http.Error(w, "Alleen GET-method toegestaan", http.StatusMethodNotAllowed)
	return

	}

	query := `SELECT * FROM Admin WHERE deleted_at IS NULL`
	rows, err := db.Query(query)
	if err != nil {
	http.Error(w, "Fout bij ophalen van de lineitem", http.StatusInternalServerError)
	return

	}

	defer rows.Close()


}






func (h Handler) GetPaymentStatus(w http.ResponseWriter, r *http.Request) {
		envList := services.LoadEnv()
		db, err := services.InitializeDatabase(envList)
	if err != nil {
		log.Fatal(err)
		}
	if r.Method != http.MethodGet {
	http.Error(w, "Alleen GET-method toegestaan", http.StatusMethodNotAllowed)
	return

	}

	query := `SELECT * FROM Admin WHERE deleted_at IS NULL`
	rows, err := db.Query(query)
	if err != nil {
	http.Error(w, "Fout bij ophalen van de paymenstatus", http.StatusInternalServerError)
	return

	}

	defer rows.Close()


}




func (h Handler) GetPaymentMethod(w http.ResponseWriter, r *http.Request) {
		envList := services.LoadEnv()
		db, err := services.InitializeDatabase(envList)
	if err != nil {
		log.Fatal(err)
		}
	if r.Method != http.MethodGet {
	http.Error(w, "Alleen GET-method toegestaan", http.StatusMethodNotAllowed)
	return

	}

	query := `SELECT * FROM Admin WHERE deleted_at IS NULL`
	rows, err := db.Query(query)
	if err != nil {
	http.Error(w, "Fout bij ophalen van de paymentmethod", http.StatusInternalServerError)
	return

	}

	defer rows.Close()


}





func (h Handler) GetPayment(w http.ResponseWriter, r *http.Request) {
		envList := services.LoadEnv()
		db, err := services.InitializeDatabase(envList)
	if err != nil {
		log.Fatal(err)
		}
	if r.Method != http.MethodGet {
	http.Error(w, "Alleen GET-method toegestaan", http.StatusMethodNotAllowed)
	return

	}

	query := `SELECT * FROM Admin WHERE deleted_at IS NULL`
	rows, err := db.Query(query)
	if err != nil {
	http.Error(w, "Fout bij ophalen van de payment", http.StatusInternalServerError)
	return

	}

	defer rows.Close()


}





func (h Handler) GetAccommodationTypes(w http.ResponseWriter, r *http.Request) {
		envList := services.LoadEnv()
		db, err := services.InitializeDatabase(envList)
	if err != nil {
		log.Fatal(err)
		}
	if r.Method != http.MethodGet {
	http.Error(w, "Alleen GET-method toegestaan", http.StatusMethodNotAllowed)
	return

	}

	query := `SELECT * FROM Admin WHERE deleted_at IS NULL`
	rows, err := db.Query(query)
	if err != nil {
	http.Error(w, "Fout bij ophalen van de accomodationtype", http.StatusInternalServerError)
	return

	}

	defer rows.Close()


}




func (h Handler) GetAccommodationFeatures(w http.ResponseWriter, r *http.Request) {
		envList := services.LoadEnv()
		db, err := services.InitializeDatabase(envList)
	if err != nil {
		log.Fatal(err)
		}
	if r.Method != http.MethodGet {
	http.Error(w, "Alleen GET-method toegestaan", http.StatusMethodNotAllowed)
	return

	}

	query := `SELECT * FROM Admin WHERE deleted_at IS NULL`
	rows, err := db.Query(query)
	if err != nil {
	http.Error(w, "Fout bij ophalen van de accomodationfeatures", http.StatusInternalServerError)
	return

	}

	defer rows.Close()


}





func (h Handler) GetAccommodation(w http.ResponseWriter, r *http.Request) {
		envList := services.LoadEnv()
		db, err := services.InitializeDatabase(envList)
	if err != nil {
		log.Fatal(err)
		}
	if r.Method != http.MethodGet {
	http.Error(w, "Alleen GET-method toegestaan", http.StatusMethodNotAllowed)
	return

	}

	query := `SELECT * FROM Admin WHERE deleted_at IS NULL`
	rows, err := db.Query(query)
	if err != nil {
	http.Error(w, "Fout bij ophalen van de accomodation", http.StatusInternalServerError)
	return

	}

	defer rows.Close()


}





func (h Handler) GetReservations(w http.ResponseWriter, r *http.Request) {
		envList := services.LoadEnv()
		db, err := services.InitializeDatabase(envList)
	if err != nil {
		log.Fatal(err)
		}
	if r.Method != http.MethodGet {
	http.Error(w, "Alleen GET-method toegestaan", http.StatusMethodNotAllowed)
	return

	}

	query := `SELECT * FROM Admin WHERE deleted_at IS NULL`
	rows, err := db.Query(query)
	if err != nil {
	http.Error(w, "Fout bij ophalen van de reservation", http.StatusInternalServerError)
	return

	}

	defer rows.Close()


}
