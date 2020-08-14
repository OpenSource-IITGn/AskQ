package resolvers

import "model"
import "context"
import "strconv"
import "fmt"

// Create Comment

type CreateCommentArgs struct {
	Pid		string
	Body	string
}

func (r * Resolvers) CreateComment(ctx context.Context, args CreateCommentArgs) (*QueryResponse, error) {
	profile, _ := r.GetMyProfile(ctx)

	if profile.Status!=200 {
		return &QueryResponse{Status: profile.Status, Msg: profile.Msg}, nil
	}

	// Set user
	comment := model.Comment{}
	comment.User = *(profile.User.U)

	// Set PostId
	pid, err := strconv.ParseUint(*args.QuesID, 10, 64);
	if err != nil {
		msg := "Invalid Id. Are you trying to panic me? :("
		return &QueryResponse{Status: 302, Msg: &msg}, nil
	} else {
		comment.PostID = pid
	}

	comment.Body = args.Body

	if err := r.DB.Create(&comment).Error; err != nil {
		msg:= "Error while creating comment"
		return &QueryResponse{Status: 305, Msg: &msg}, nil
	}

	return &QueryResponse{Status: 300, Msg: nil}, nil

}

// Update Comment

type UpdateCommentArgs struct {
	Cid		string
	Body	string
}


func (r *Resolvers) UpdateComment(ctx context.Context, args UpdateCommentArgs) (*QueryResponse, error) {
	profile, _ := r.GetMyProfile(ctx)

	if profile.Status!=200 {
		return &QueryResponse{Status: profile.Status, Msg: profile.Msg}, nil
	}

	comment := model.Comment{}
	if r.DB.Where("id = ?", args.Cid).First(&comment).RecordNotFound() {
		msg := "Not Found. Are you trying something you are not meant to?"
		return &QueryResponse{Status: 301, Msg: &msg}, nil
	}

	if comment.UserID != profile.User.U.ID {
		msg := "Not Authorized. Please do not poke into others work."
		return &QueryResponse{Status: 308, Msg: &msg}, nil
	}

	if err := r.DB.Model(&comment).Update("body", args.Body).Error; err != nil {
		msg:= "Error while updating"
		return &QueryResponse{Status: 306, Msg: &msg}, nil
	}

	return &QueryResponse{Status: 300, Msg: fmt.Sprint(comment.ID)}, nil
}

// Currently Hard Delete
func (r * Resolvers) DeleteComment(ctx context.Context, args struct{ Cid string}) (*QueryResponse, error) {
	profile, _ := r.GetMyProfile(ctx)

	if profile.Status!=200 {
		return &QueryResponse{Status: profile.Status, Msg: profile.Msg}, nil
	}

	comment := model.Comment{}
	if r.DB.Where("id = ?", args.Cid).First(&comment).RecordNotFound() {
		msg := "Not Found. Are you trying something you are not meant to?"
		return &QueryResponse{Status: 301, Msg: &msg}, nil
	}
	
	if comment.UserID != profile.User.U.ID {
		msg := "Not Authorized. Please do not poke into others work."
		return &QueryResponse{Status: 308, Msg: &msg}, nil
	}

	// This is a hard delete
	if err := r.DB.Unscoped().Delete(&comment).Error; err != nil {
		msg:= "Error while deleting"
		return &QueryResponse{Status: 309, Msg: &msg}, nil
	}

	return &QueryResponse{Status: 300, Msg: fmt.Sprint(comment.ID)}, nil
}