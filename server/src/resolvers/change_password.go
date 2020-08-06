package resolvers

import (
	"context"

	"handler"
	"model"
)

// ChangePassword mutation change password
func (r *Resolvers) ChangePassword(ctx context.Context, password string) (*QueryResponse, error) {
	userID := ctx.Value(handler.ContextKey("userID"))

	if userID == nil {
		msg := "Not Authorized"
		return &QueryResponse{Status: 202, Msg: &msg}, nil
	}
	user := model.User{}

	if err := r.DB.First(&user, userID).Error; err != nil {
		msg := "Not existing user"
		return &QueryResponse{Status: 201, Msg: &msg}, nil
	}

	user.Password = password
	user.HashPassword()

	r.DB.Save(&user)
	return &QueryResponse{Status: 200, Msg: &msg}, nil
}
