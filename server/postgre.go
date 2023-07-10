package main

import (
	"database/sql"
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

func (p *Postgres) FetchStats(itemNumber int) (*LiquorStats, error) {

	rows, err := p.client.Query(`SELECT item_number, 
								price_avg_usd,
								store_count,
								sold_liters,
								busiest_store_id,
								store_name,
								store_city
								FROM liquor_store_stats
								WHERE item_number= $1 LIMIT 1`, itemNumber)

	if err != nil {
		log.Fatalln(err)
	}

	got := LiquorStats{}
	for rows.Next() {

		err = rows.Scan(&got.ItemNumber,
			&got.Price,
			&got.StoreCount,
			&got.Liters,
			&got.BusyStoreId,
			&got.StoreName,
			&got.StoreCity,
		)

		if err != nil {
			log.Fatalf("Scan: %v", err)
			return nil, err
		}
	}

	return &got, nil

}