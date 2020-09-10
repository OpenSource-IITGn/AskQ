package db

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// DB *grom.DB
type DB struct {
	*gorm.DB
}

// ConnectDB : connecting DB
func ConnectDB() (*DB, error) {
	db, err := gorm.Open("postgres", "host=localhost port=5432 user=test dbname=test password=test sslmode=disable")

	if err != nil {
		panic(err)
	}

	if err := db.Exec("CREATE EXTENSION IF NOT EXISTS pg_trgm;").Error; err != nil {
		panic(err)
	}

	if err := db.Exec("CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;").Error; err != nil {
		panic(err)
	}
	return &DB{db}, nil
}
