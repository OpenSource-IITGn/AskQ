package main

import (
	"context"
	"log"
	"net/http"

	graphql "github.com/graph-gophers/graphql-go"

	"db"
	"handler"
	"resolvers"
	"schemas"
)

func main() {

	db, err := db.ConnectDB()
	if err != nil {
		panic(err)
	}

	defer db.Close()

	context.Background()

	opts := []graphql.SchemaOpt{graphql.UseFieldResolvers()}
	schema := graphql.MustParseSchema(*schemas.NewSchema(), &resolvers.Resolvers{DB: db}, opts...)
	h := handler.Authenticate(&handler.GraphQL{Schema: schema})

	mux := http.NewServeMux()
	mux.Handle("/", handler.GraphiQL{})
	mux.Handle("/query", disableCors(h))

	s := &http.Server{
		Addr:    ":8080",
		Handler: mux,
	}

	log.Println("Listening to... port 8080")
	if err = s.ListenAndServe(); err != nil {
		panic(err)
	}

}

func disableCors(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

		w.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, Accept-Encoding")

		if r.Method == "OPTIONS" {
			w.Header().Set("Access-Control-Max-Age", "86400")
			w.WriteHeader(http.StatusOK)
			return
		}

		h.ServeHTTP(w, r)
	})
}
