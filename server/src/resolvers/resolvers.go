package resolvers

import (
	"db"
)

// Resolvers including query and mutation
type Resolvers struct {
	*db.DB
}
