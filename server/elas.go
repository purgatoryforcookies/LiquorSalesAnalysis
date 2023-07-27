package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/elastic/go-elasticsearch/v8"
)

type LiquorClient struct {
	client *elasticsearch.Client
	idx    string
}

func NewLiquorConnection(idx string) *LiquorClient {
	es, err := elasticsearch.NewDefaultClient()
	if err != nil {
		log.Fatalf("Error creating the client: %s", err)
		return nil
	}
	res, err := es.Info()
	if err != nil {
		log.Fatalf("Error getting response: %s", err)
	}
	defer res.Body.Close()

	return &LiquorClient{
		client: es,
		idx:    idx,
	}
}

func (s *LiquorClient) SearchElastic(query map[string]interface{}, output interface{}) {

	var buf bytes.Buffer

	if err := json.NewEncoder(&buf).Encode(query); err != nil {
		log.Fatalf("Error encoding query: %s", err)
	}

	res, err := s.client.Search(
		s.client.Search.WithContext(context.Background()),
		s.client.Search.WithIndex(s.idx),
		s.client.Search.WithBody(&buf),
		s.client.Search.WithTrackTotalHits(true),
		s.client.Search.WithPretty(),
	)

	if res.IsError() {
		log.Fatalf("Error: %s", res.String())
	}

	if err != nil {
		fmt.Printf("Error getting response: %s", err)
	}

	if err := json.NewDecoder(res.Body).Decode(&output); err != nil {
		fmt.Println("Error parsing body", err)
	}
	defer res.Body.Close()

}
