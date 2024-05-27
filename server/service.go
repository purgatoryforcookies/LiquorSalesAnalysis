package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type Server struct {
	*mux.Router
	liquor   *LiquorClient
	pgClient *Postgres
}

func NewServer(elaConnection *LiquorClient, pgConnection *Postgres, port string) *Server {
	s := &Server{
		Router:   mux.NewRouter(),
		liquor:   elaConnection,
		pgClient: pgConnection,
	}
	s.router()

	fmt.Println("Server started and listening", port)

	return s
}

func (s *Server) router() {
	s.HandleFunc("/elapi/search", s.handleQuickSearch()).Methods("GET")
	s.HandleFunc("/elapi/engine", s.handleEngineRequest()).Methods("GET")
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

		results := BasicResponse{}
		s.liquor.SearchElastic(
			QuickSearchQuery(keyword, []string{"name", "vol_ml", "category", "pack"}),
			&results,
		)

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

		embedResults := EmbedResponse{}
		s.liquor.SearchElastic(
			EmbeddingSearchQuery(id_, []string{"embed", "productCode"}),
			&embedResults,
		)

		engineResults := BasicResponse{}
		s.liquor.SearchElastic(
			SimilaritySearchQuery(embedResults.Hits.Hits[0].Fields.Embed),
			&engineResults,
		)
		if len(engineResults.Hits.Hits) == 0 {
			http.Error(w, "No matches", http.StatusNotFound)
			return
		}

		baseResults := BasicResponse{}
		s.liquor.SearchElastic(
			SearchByProdCodeQuery(embedResults.Hits.Hits[0].Fields.ProductCode[0],
				[]string{"name", "vol_ml", "category", "pack"}),
			&baseResults,
		)

		type Response struct {
			Result []Hits      `json:"result"`
			Engine []Hits      `json:"engine"`
			Stats  LiquorStats `json:"stats"`
		}

		statResult, err := s.pgClient.FetchStats(embedResults.Hits.Hits[0].Fields.ProductCode[0])
		if err != nil {
			http.Error(w, "Error in the engine", http.StatusInternalServerError)
			return
		}

		resp := Response{
			Result: baseResults.Hits.Hits,
			Engine: engineResults.Hits.Hits,
			Stats:  *statResult,
		}

		if err := json.NewEncoder(w).Encode(resp); err != nil {
			http.Error(w, "Meni joku vikkaan", http.StatusBadRequest)
			return
		}

	}
}
