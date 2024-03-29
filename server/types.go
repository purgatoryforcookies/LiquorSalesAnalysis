package main

type BasicResponse struct {
	ElasticBase
	Hits struct {
		Total struct {
			Value    int    `json:"value"`
			Relation string `json:"relation"`
		} `json:"total"`
		MaxScore float64 `json:"max_score"`
		Hits     []Hits
	} `json:"hits"`
}

type EmbedResponse struct {
	ElasticBase
	Hits struct {
		Total struct {
			Value    int    `json:"value"`
			Relation string `json:"relation"`
		} `json:"total"`
		MaxScore float64 `json:"max_score"`
		Hits     []Embeds
	} `json:"hits"`
}

type Hits struct {
	HitsBase
	Fields struct {
		Name     []string `json:"name"`
		Pack     []int    `json:"pack"`
		Vol      []int    `json:"vol_ml"`
		Category []string `json:"category"`
	} `json:"fields"`
}
type Embeds struct {
	HitsBase
	Fields struct {
		Embed       []float64 `json:"embed"`
		ProductCode []int     `json:"productCode"`
	} `json:"fields"`
}

type ElasticBase struct {
	Took     int  `json:"took"`
	TimedOut bool `json:"timed_out"`
	Shards   struct {
		Total      int `json:"total"`
		Successful int `json:"successful"`
		Skipped    int `json:"skipped"`
		Failed     int `json:"failed"`
	} `json:"_shards"`
}

type HitsBase struct {
	Index string  `json:"_index"`
	ID    string  `json:"_id"`
	Score float64 `json:"_score"`
}

func (r *BasicResponse) HitsOnly() []Hits {
	return r.Hits.Hits
}

type LiquorStats struct {
	ItemNumber  int     `json:"item_number"`
	Price       float32 `json:"price_avg_usd"`
	StoreCount  int     `json:"store_count"`
	Liters      float32 `json:"sold_liters"`
	BusyStoreId int     `json:"busiest_store_id"`
	StoreName   string  `json:"store_name"`
	StoreCity   string  `json:"store_city"`
}
