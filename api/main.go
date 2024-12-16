package main

import (
	"dreamchasers/routes"
	"dreamchasers/services"
	"flag"
	"log"
	"net/http"
	"strings"
)

func main() {
	shouldMigrate, shouldServe := parseCLIFlags()
	if *shouldMigrate {
		println("Beginning database migration")
		migrate()
	}
	if *shouldServe {
		println("Starting HTTP server")
		serve()
	}
}

func parseCLIFlags() (*bool, *bool) {
	migrateFlag := flag.Bool("migrate", false, "Run database migrations. Warning, can be destructive!")
	serveFlag := flag.Bool("serve", false, "Start HTTP server")

	flag.Parse()

	return migrateFlag, serveFlag
}

func serve() {
	handlerList := routes.ListHandlerMethods()
	routeList := routes.GenerateRoutesFromHandlers(handlerList)

	// Sends all request to ExecuteRouteHandler to match a handler to the requested route
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := strings.ToLower(r.URL.Path[1:]) // Remove leading slash
		routes.ExecuteRouteHandler(routeList, path, w, r)
	})

	http.ListenAndServe(":4000", nil)
}

func migrate() {
	envList := services.LoadEnv()

	db, err := services.InitializeDatabase(envList)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(25)
	db.SetConnMaxLifetime(0)

	services.DbMigration(db)
}
