package main

import (
	"database/sql"
	"fmt"
	"log"
)

type Postgres struct {
	client *sql.DB
}

func NewPgConnection(conStr string) *Postgres {

	db, err := sql.Open("postgres", conStr)
	if err != nil {
		log.Fatal(err)
	}

	return &Postgres{
		client: db,
	}

}

func (p *Postgres) FetchStats() {

	rows, err := p.client.Query("SELECT liquor.Item Number, liquor.Item Description FROM liquor LIMIT 2")

	if err != nil {
		log.Fatalln(err)
	}

	got := []LiquorRow{}
	for rows.Next() {
		// fmt.Println(rows)
		var r LiquorRow
		err = rows.Scan(&r.ItemNumber, &r.Description)

		if err != nil {
			log.Fatalf("Scan: %v", err)
		}
		got = append(got, r)

	}

	fmt.Printf("%+v\n", got)

}
