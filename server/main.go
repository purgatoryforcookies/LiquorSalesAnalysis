package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq"
)

func main() {

	connStr := fmt.Sprintf("postgresql://%s:%s@%s/%s?sslmode=disable",
		os.Getenv("POSTGRES_USER"),
		os.Getenv("POSTGRES_PASSWORD"),
		os.Getenv("POSTGRES_HOST"),
		os.Getenv("POSTGRES_DB"))

	liquorClient := NewLiquorConnection("liquoridx")
	pgClient := NewPgConnection(connStr)

	server := NewServer(liquorClient, pgClient)

	portStr := fmt.Sprintf(":%s", os.Getenv("SERVER_PORT"))

	if err := http.ListenAndServe(portStr, server); err != nil {
		log.Fatal(err)
	}

}
