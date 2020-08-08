package resolvers

import (
	"fmt"
	"model"
)

// UserResponse is the user response type
type UserResponse struct {
	U *model.User
}

// ID for UserResponse
func (r *UserResponse) ID() string {
	return fmt.Sprint(r.U.ID)
}

// Email for UserResponse
func (r *UserResponse) Email() string {
	return r.U.Email
}


// FirstName for UserResponse
func (r *UserResponse) UserName() string {
	return r.U.UserName
}


// FirstName for UserResponse
func (r *UserResponse) FirstName() *string {
	return &r.U.FirstName
}

// LastName for UserResponse
func (r *UserResponse) LastName() *string {
	return &r.U.LastName
}

// Avatar for UserResponse
func (r *UserResponse) Avatar() *string {
	return &r.U.Avatar
}

// CreatedAt for UserResponse
func (r *UserResponse) CreatedAt() string {
	return r.U.CreatedAt.String()
}

// UpdatedAt for UserResponse
func (r *UserResponse) UpdatedAt() string {
	return r.U.UpdatedAt.String()
}
