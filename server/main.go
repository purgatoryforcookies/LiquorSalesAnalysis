package main

import (
	"net/http"

	_ "github.com/lib/pq"
)

func main() {

	port := ":3002"

	liquorClient := NewLiquorConnection("liquoridx")

	server := NewServer(liquorClient)
	http.ListenAndServe(port, server)

	// connStr := "postgresql://username123:password123@localhost/db?sslmode=disable"

	// pgClient := NewPgConnection(connStr)

	// pgClient.FetchStats()

}
