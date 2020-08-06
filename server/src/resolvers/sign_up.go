package resolvers

import "model"
import "time"

// SignUp mutation creates user
func (r *Resolvers) SignUp(args signUpMutationArgs) (*SignUpResponse, error) {

	newUser := model.User{Email: args.Email, Password: args.Password, FirstName: args.UserName}

	if !r.DB.Where("email = ?", args.Email).First(&model.User{}).RecordNotFound() {
		msg := "Already signed up"
		return &SignUpResponse{Status: false, Msg: &msg, User: nil}, nil
	}

	if !r.DB.Where("username = ?", args.UserName).First(&model.User{}).RecordNotFound() {
		msg := "UserName Already in Use"
		return &SignUpResponse{Status: false, Msg: &msg, User: nil}, nil
	}

	if !newUser.HashPassword() {
		msg := "Error occured while registering. Try again after some time."
		return &SignUpResponse{Status: false, Msg: &msg, User: nil}, nil
	}
	newUser.CreatedAt = time.Now()
	newUser.UpdatedAt = time.Now()

	r.DB.Create(&newUser)

	if !r.DB.Where("username = ?", args.UserName).First(&model.User{}).RecordNotFound() {
		msg := "Error occured while registering. Try again after some time."
		return &SignUpResponse{Status: false, Msg: &msg, User: nil}, nil
	}

	return &SignUpResponse{Status: true, Msg: nil, User: &UserResponse{u: &newUser}}, nil
}

type signUpMutationArgs struct {
	Email     string
	Password  string
	UirstName string
}

// SignUpResponse is the response type
type SignUpResponse struct {
	Status bool
	Msg    *string
	User   *UserResponse
}

// Ok for SignUpResponse
func (r *SignUpResponse) Ok() bool {
	return r.Status
}

// Error for SignUpResponse
func (r *SignUpResponse) Error() *string {
	return r.Msg
}