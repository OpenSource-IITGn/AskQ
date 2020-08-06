package resolvers

import(
	"context"
	"handler"
	"model"
)

// GetMyProfile resolver
func (r *Resolvers) GetMyProfile(ctx context.Context) (*GetProfileResponse, error) {
	userID := ctx.Value(handler.ContextKey("userID"))

	if userID == nil {
		msg := "Not Authorized"
		return &GetProfileResponse{Status: 202, Msg: &msg, User: nil}, nil
	}

	user := model.User{}
	if err := r.DB.First(&user, userID).Error; err != nil {
		msg := "Not found"
		return &GetProfileResponse{Status: 201, Msg: &msg, User: nil}, nil
	}
	return &GetProfileResponse{Status: 200, Msg: nil, User: &UserResponse{u: &user}}, nil
}

// GetUserProfile
type GetProfileArgs struct{
	UserName string
}

func (r *Resolvers) GetProfile(args GetProfileArgs) (*GetProfileResponse, error) {
	user := model.User{}
	if err := r.DB.Where("username = ?", args.UserName).First(&user).Error; err != nil {
		msg := "Not found"
		return &GetProfileResponse{Status: 201, Msg: &msg, User: nil}, nil
	}
	return &GetProfileResponse{Status: 200, Msg: nil, User: &UserResponse{u: &user}}, nil
}


// ChangePassword mutation change password
type ChangePasswordArgs struct {
	Password string
}

func (r *Resolvers) ChangePassword(ctx context.Context, args ChangePasswordArgs) (*QueryResponse, error) {
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

	user.Password = args.Password
	user.HashPassword()

	r.DB.Save(&user)
	return &QueryResponse{Status: 200, Msg: nil}, nil
}

// Change Profile
type ChangeProfileArgs struct {
	UserName 	string
	FirstName	string
	LastName	string
	Avatar		string
}

func (r *Resolvers) ChangeProfile(ctx context.Context, args ChangeProfileArgs) (*QueryResponse, error) {
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

	if args.FirstName!="" {
		user.FirstName = args.FirstName
	}
	if args.LastName!="" {
		user.LastName = args.LastName
	}
	if args.Avatar!="" {
		user.Avatar = args.Avatar
	}
	if args.UserName==user.UserName {
		r.DB.Save(&user)
		return &QueryResponse{Status: 200, Msg: nil}, nil		
	} else if err := r.DB.Where("username = ?", args.UserName).First(&user).Error; err == nil {
		msg:= "Username already in use"
		return &QueryResponse{Status: 203, Msg: &msg}, nil
	}


	r.DB.Save(&user)
	return &QueryResponse{Status: 200, Msg: nil}, nil
}