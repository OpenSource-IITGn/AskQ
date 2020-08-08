package resolvers

import (
	"fmt"
	"model"
	"jwtutil"
)

// SignIn mutation creates user
func (r *Resolvers) SignIn(args signInMutationArgs) (*SignInResponse, error) {
	user := model.User{}

	if err:= r.DB.Where("email = ?", args.Email).First(&user).Error; err!=nil {
		msg := "Not Sign up yet"
		return &SignInResponse{Status: false, Msg: &msg, Token: nil}, nil
	}

	if !user.ComparePassword(args.Password) {
		msg := "Password is not correct"
		return &SignInResponse{Status: false, Msg: &msg, Token: nil}, nil
	}

	userIDString := fmt.Sprint(user.ID)
	tokenString, err := jwtutil.SignJWT(&userIDString)
	if err != nil {
		msg := "Error in generating JWT"
		return &SignInResponse{Status: false, Msg: &msg, Token: nil}, nil
	}

	return &SignInResponse{Status: true, Msg: nil, Token: tokenString}, nil
}

type signInMutationArgs struct {
	Email    string
	Password string
}

// SignInResponse is the response type
type SignInResponse struct {
	Status bool
	Msg    *string
	Token  *string
}

// Ok for SignUpResponse
func (r *SignInResponse) Ok() bool {
	return r.Status
}

// Error for SignUpResponse
func (r *SignInResponse) Error() *string {
	return r.Msg
}
