package main

import (
	"fmt"
	"net/http"
	"os"

	_ "github.com/lib/pq"
)

func main() {

	port := ":3002"
	connStr := fmt.Sprintf("postgresql://%s:%s@localhost/db?sslmode=disable",
		os.Getenv("POSTGRES_USER"), os.Getenv("POSTGRES_PASSWORD"))

	liquorClient := NewLiquorConnection("liquoridx")
	pgClient := NewPgConnection(connStr)

	server := NewServer(liquorClient, pgClient)
	http.ListenAndServe(port, server)

}
