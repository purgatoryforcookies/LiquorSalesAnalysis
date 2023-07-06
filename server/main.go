package main

import "net/http"

func main() {

	// tmp := NewLiquorConnection("liquoridx")

	// res, err := tmp.SearchEmbedding("W78_IIkBtDQXcKWmGhbL", []string{"embed"})
	// if err != nil {
	// 	fmt.Println("Theres an error in the searchbedding, u know..", err)
	// }

	// res2 := tmp.SimilaritySearch(res)

	// fmt.Printf("%+v\n", res2.Hits.Hits)

	port := ":3002"

	liquorClient := NewLiquorConnection("liquoridx")

	server := NewServer(liquorClient)
	http.ListenAndServe(port, server)

}
