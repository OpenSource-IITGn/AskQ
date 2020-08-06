package resolvers

import (
	"db"
)

// Resolvers including query and mutation
type Resolvers struct {
	*db.DB
}

type QueryResponse struct {
	Status		uint
	Msg			*string
}

// Ok for QueryResponse
func (r *QueryResponse) Ok() uint {
	return r.Status
}

// Error for QueryResponse
func (r *QueryResponse) Error() *string {
	return r.Msg
}