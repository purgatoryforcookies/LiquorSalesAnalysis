package main

import (
	"net/http"

	_ "github.com/lib/pq"
)

func main() {

	port := ":3002"
	connStr := "postgresql://username123:password123@localhost/db?sslmode=disable"

	liquorClient := NewLiquorConnection("liquoridx")
	pgClient := NewPgConnection(connStr)

	server := NewServer(liquorClient, pgClient)
	http.ListenAndServe(port, server)

	// res, err := pgClient.FetchStats(43100)
	// if err != nil {
	// 	panic(err)
	// }

	// fmt.Println(*res)

}
