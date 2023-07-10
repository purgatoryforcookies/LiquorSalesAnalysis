package main

func QuickSearchQuery(keyword string, fields []string) map[string]interface{} {

	return map[string]interface{}{
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

}

func EmbeddingSearchQuery(id string, fields []string) map[string]interface{} {

	return map[string]interface{}{
		"_source": false,
		"fields":  fields,
		"query": map[string]interface{}{
			"term": map[string]interface{}{
				"_id": id,
			},
		},
	}

}

func SimilaritySearchQuery(e []float64) map[string]interface{} {

	return map[string]interface{}{
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

}

func SearchByProdCodeQuery(prodCode int, fields []string) map[string]interface{} {

	return map[string]interface{}{
		"_source": false,
		"fields":  fields,
		"query": map[string]interface{}{
			"term": map[string]interface{}{
				"productCode": prodCode,
			},
		},
	}

}
