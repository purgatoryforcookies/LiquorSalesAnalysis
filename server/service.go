package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type Server struct {
	*mux.Router
	liquor *LiquorClient
}

func NewServer(elaConnection *LiquorClient) *Server {
	s := &Server{
		Router: mux.NewRouter(),
		liquor: elaConnection,
	}
	s.router()

	fmt.Println("Server started and listening")

	return s
}

func (s *Server) router() {
	s.HandleFunc("/search", s.handleQuickSearch()).Methods("GET")
	s.HandleFunc("/engine", s.handleEngineRequest()).Methods("GET")
}

func (s *Server) handleQuickSearch() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		queryParams := r.URL.Query()

		keyword := queryParams.Get("keyword")

		w.Header().Set("Content-type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		if keyword == "" {
			http.Error(w, "Invalid search", http.StatusBadRequest)
			return
		}

		results := s.liquor.QuickSearch(keyword, []string{"name", "vol_ml", "category", "pack"})

		if len(results.Hits.Hits) == 0 {
			http.Error(w, "No matches this time", http.StatusNotFound)
			return
		}

		if err := json.NewEncoder(w).Encode(results.Hits.Hits); err != nil {
			http.Error(w, "Meni joku vikkaan", http.StatusBadRequest)
			return
		}

	}
}

func (s *Server) handleEngineRequest() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		queryParams := r.URL.Query()

		id_ := queryParams.Get("id")

		w.Header().Set("Content-type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		if id_ == "" {
			http.Error(w, "Invalid id", http.StatusBadRequest)
			return
		}

		res, err := s.liquor.SearchEmbedding(id_, []string{"embed"})
		if err != nil {
			http.Error(w, "Error in the engine", http.StatusNoContent)
		}
		results := s.liquor.SimilaritySearch(res)

		if len(results.Hits.Hits) == 0 {
			http.Error(w, "No matches", http.StatusNotFound)
			return
		}

		if err := json.NewEncoder(w).Encode(results.Hits.Hits); err != nil {
			http.Error(w, "Meni joku vikkaan", http.StatusBadRequest)
			return
		}

	}
}
