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

func (s *LiquorClient) QuickSearch(keyword string, fields []string) BasicResponse {

	var buf bytes.Buffer
	var result BasicResponse

	query := map[string]interface{}{
		"_source": false,
		"fields":  fields,
		"query": map[string]interface{}{
			"match": map[string]interface{}{
				"name": map[string]interface{}{
					"query":     keyword,
					"fuzziness": "AUTO",
				},
			},
		},
	}

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

	defer res.Body.Close()
	if res.IsError() {
		log.Fatalf("Error: %s", res.String())
	}

	if err != nil {
		fmt.Printf("Error getting response: %s", err)
	}

	if err := json.NewDecoder(res.Body).Decode(&result); err != nil {
		fmt.Println("Error parsing body", err)
	}

	return result
}

func (s *LiquorClient) SearchEmbedding(id string, fields []string) ([]float64, error) {

	var buf bytes.Buffer
	var result EmbedResponse

	query := map[string]interface{}{
		"_source": false,
		"fields":  fields,
		"query": map[string]interface{}{
			"term": map[string]interface{}{
				"_id": id,
			},
		},
	}

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

	defer res.Body.Close()
	if res.IsError() {
		log.Fatalf("Error: %s", res.String())
	}

	if err != nil {
		fmt.Printf("Error getting response: %s", err)
	}

	if err := json.NewDecoder(res.Body).Decode(&result); err != nil {
		fmt.Println("Error parsing body", err)
		return nil, err
	}

	return result.Hits.Hits[0].Fields.Embed, nil
}

func (s *LiquorClient) SimilaritySearch(e []float64) BasicResponse {

	var buf bytes.Buffer
	var result BasicResponse

	query := map[string]interface{}{
		"_source": false,
		"fields":  []string{"name", "vol_ml", "category", "pack"},
		"query": map[string]interface{}{
			"script_score": map[string]interface{}{
				"query": map[string]interface{}{
					"match_all": map[string]interface{}{},
				},
				"script": map[string]interface{}{
					"source": "cosineSimilarity(params.queryVector, 'embed') + 1.0",
					"params": map[string]interface{}{
						"queryVector": e,
					},
				},
			},
		},
	}

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
	defer res.Body.Close()
	if res.IsError() {
		log.Fatalf("Error: %s", res.String())
	}

	if err != nil {
		fmt.Printf("Error getting response: %s", err)
	}

	if err := json.NewDecoder(res.Body).Decode(&result); err != nil {
		fmt.Println("Error parsing body", err)
	}

	return result
}
