package resolvers

import (
	"strconv"

	graphql "github.com/graph-gophers/graphql-go"

	"github.com/mattdamon108/go-graphql-api-boilerplate/model"
)

// UserResponse is the user response type
type UserResponse struct {
	u *model.User
}

// ID for UserResponse
func (r *UserResponse) ID() graphql.ID {
	id := strconv.Itoa(int(r.u.ID))
	return graphql.ID(id)
}

// Email for UserResponse
func (r *UserResponse) Email() string {
	return r.u.Email
}


// FirstName for UserResponse
func (r *UserResponse) UserName() string {
	return r.u.UserName
}


// FirstName for UserResponse
func (r *UserResponse) FirstName() string {
	return r.u.FirstName
}

// LastName for UserResponse
func (r *UserResponse) LastName() string {
	return r.u.LastName
}

// Avatar for UserResponse
func (r *UserResponse) Avatar() string {
	return r.u.Avatar
}

// CreatedAt for UserResponse
func (r *UserResponse) CreatedAt() string {
	return r.u.CreatedAt.String()
}

// UpdatedAt for UserResponse
func (r *UserResponse) UpdatedAt() string {
	return r.u.UpdatedAt.String()
}
