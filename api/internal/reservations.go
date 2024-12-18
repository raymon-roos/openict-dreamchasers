package main

import(
	"database/sql"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

// onderhouden connecties database, zodat herbruikt kan worden.
var db *sql.DB

func initDB () {
var err error
// pas database inloggegevens aan
db, err = sql.Open("mysql", "root:password@tcp(127.0.0.1:3306)/jouw_database")
if err != nil {
	log.Fatalf("Fout bij verbinden met database: %v", err)
}
// Test de verbinding
if err := db.Ping(); err != nil {
	log.Fatalf("Kan geen verbinding maken met database: %v", err)
}

fmt.Println("Succesvol verbonden met database!")
}


func main() {
	initDB()
	defer db.Close()

	fmt.Println("Server draait op http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}


}
