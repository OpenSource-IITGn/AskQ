package resolvers

import (
	"db"
)

// Resolvers including query and mutation
type Resolvers struct {
	*db.DB
}

type QueryResponse struct {
	Status		int32
	Msg			*string
}

// Ok for QueryResponse
func (r *QueryResponse) Ok() int32 {
	return r.Status
}

// Error for QueryResponse
func (r *QueryResponse) Error() *string {
	return r.Msg
}

// Profile Response Type
type GetProfileResponse struct {
	Status		int32
	Msg 		*string
	User 		*UserResponse
}

// Ok for GetProfileResponse
func (r *GetProfileResponse) Ok() int32 {
	return r.Status
}

// Error for GetProfileResponse
func (r *GetProfileResponse) Error() *string {
	return r.Msg
}
