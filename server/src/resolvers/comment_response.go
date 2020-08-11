package resolvers

import (
	"fmt"
	"model"
)

type CommentResponse struct {
	p   *model.Comment
	res *Resolvers
}

// ID for CommentResponse
func (r *CommentResponse) ID() string {
	return fmt.Sprint(r.p.ID)
}

// CreatedAt for CommentResponse
func (r *CommentResponse) CreatedAt() string {
	return r.p.CreatedAt.String()
}

// UpdatedAt for CommentResponse
func (r *CommentResponse) UpdatedAt() string {
	return r.p.UpdatedAt.String()
}

// Body for CommentResponse
func (r *CommentResponse) Body() *string {
	return &r.p.Body
}

// User for CommentResponse
func (r *CommentResponse) User() *UserResponse {
	user := model.User{}
	if err := r.res.DB.Model(r.p).Related(&user, "User").Error; err != nil {
		return nil
	}
	return &UserResponse{U: &user}
}
