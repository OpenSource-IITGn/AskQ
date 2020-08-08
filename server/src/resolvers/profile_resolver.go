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
	return &GetProfileResponse{Status: 200, Msg: nil, User: &UserResponse{U: &user}}, nil
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
	return &GetProfileResponse{Status: 200, Msg: nil, User: &UserResponse{U: &user}}, nil
}


// ChangePassword mutation change password
type ChangePasswordArgs struct {
	Password string
}

func (r *Resolvers) ChangePassword(ctx context.Context, args ChangePasswordArgs) (*QueryResponse, error) {
	
	profile, _ := r.GetMyProfile(ctx)

	if profile.Status!=200 {
		return &QueryResponse{Status: profile.Status, Msg: profile.Msg}, nil
	}

	profile.User.U.Password = args.Password
	profile.User.U.HashPassword()

	if err := r.DB.Save(profile.User.U).Error; err != nil {
		msg:= "Error while updating"
		return &QueryResponse{Status: 204, Msg: &msg}, nil
	}
	
	return &QueryResponse{Status: 200, Msg: nil}, nil
}

// Change Profile
type ChangeProfileArgs struct {
	UserName 	*string
	FirstName	*string
	LastName	*string
	Avatar		*string
}

func (r *Resolvers) ChangeProfile(ctx context.Context, args ChangeProfileArgs) (*QueryResponse, error) {
	profile, _ := r.GetMyProfile(ctx)

	if profile.Status!=200 {
		return &QueryResponse{Status: profile.Status, Msg: profile.Msg}, nil
	}

	update := make(map[string]string)

	if args.FirstName!=nil {
		update["FirstName"] = *args.FirstName
	}
	if args.LastName!=nil {
		update["LastName"] = *args.LastName
	}
	if args.Avatar!=nil {
		update["Avatar"] = *args.Avatar
	}
	if args.UserName==nil {
		r.DB.Model(profile.User.U).Update(update)
		return &QueryResponse{Status: 200, Msg: nil}, nil		
	} else if !r.DB.Where("username = ?", *args.UserName).First(&model.User{}).RecordNotFound()  {
		msg:= "Username already in use"
		return &QueryResponse{Status: 203, Msg: &msg}, nil
	} else {
		update["UserName"] = *args.UserName
	}

	if err := r.DB.Model(profile.User.U).Update(update).Error; err != nil {
		msg:= "Error while updating"
		return &QueryResponse{Status: 204, Msg: &msg}, nil
	}

	return &QueryResponse{Status: 200, Msg: nil}, nil
}