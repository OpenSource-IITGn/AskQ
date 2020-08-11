package resolvers

import "model"
import "time"

// SignUp mutation creates user
func (r *Resolvers) SignUp(args signUpMutationArgs) (*QueryResponse, error) {

	newUser := model.User{Email: args.Email, Password: args.Password, FirstName: args.UserName}

	if !r.DB.Where("email = ?", args.Email).First(&model.User{}).RecordNotFound() {
		msg := "Already signed up"
		return &QueryResponse{Status: 104, Msg: &msg}, nil
	}

	if !r.DB.Where("user_name = ?", args.UserName).First(&model.User{}).RecordNotFound() {
		msg := "UserName Already in Use"
		return &QueryResponse{Status: 103, Msg: &msg}, nil
	}

	newUser.HashPassword()
	
	newUser.CreatedAt = time.Now()
	newUser.UpdatedAt = time.Now()

	if err := r.DB.Create(&newUser).Error; err!=nil {
		msg := "Error occured while registering. Try again after some time."
		return &QueryResponse{Status: 101, Msg: &msg}, nil		
	}

	return &QueryResponse{Status: 100, Msg: nil}, nil
}

type signUpMutationArgs struct {
	Email     string
	Password  string
	UserName string
}
