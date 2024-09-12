package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/acme/autocert"
)

func main() {

	certManager := autocert.Manager{
		Prompt:     autocert.AcceptTOS,
		HostPolicy: autocert.HostWhitelist("purgatoryforcookies.com", "www.purgatoryforcookies.com"),
		Cache:      autocert.DirCache("certs"),
	}

	connStr := fmt.Sprintf("postgresql://%s:%s@%s/%s?sslmode=disable",
		os.Getenv("POSTGRES_USER"),
		os.Getenv("POSTGRES_PASSWORD"),
		os.Getenv("POSTGRES_HOST"),
		os.Getenv("POSTGRES_DB"))

	liquorClient := NewLiquorConnection("liquoridx")
	pgClient := NewPgConnection(connStr)

	server := NewServer(liquorClient, pgClient)

	certManager.TLSConfig().ServerName = "purgatoryforcookies.com"

	tlsServer := &http.Server{
		Addr:      ":https",
		TLSConfig: certManager.TLSConfig(),
		Handler:   handlers.LoggingHandler(os.Stdout, limit(server)),
	}

	go func() {
		if err := http.ListenAndServe(":http", certManager.HTTPHandler(nil)); err != nil {
			log.Fatal(err)
		}
	}()
	fmt.Println("Liquor server is running...")
	log.Fatal(tlsServer.ListenAndServeTLS("", ""))

}
