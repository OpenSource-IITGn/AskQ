package resolvers

import "model"
import "context"
import "strconv"

// Create Post

type TagList struct {
	Tag1 *string
	Tag2 *string
	Tag3 *string
	Tag4 *string
	Tag5 *string
}

type CreatePostArgs struct {
	PostType	int32
	QuesID		*string
	Title		*string
	Body		string
	Tags		TagList
}

func (r *Resolvers) CreatePost(ctx context.Context ,args CreatePostArgs) (*QueryResponse, error) {
	profile, _ := r.GetMyProfile(ctx)

	if profile.Status!=200 {
		return &QueryResponse{Status: profile.Status, Msg: profile.Msg}, nil
	}

	// Set user
	post := model.Post{}
	post.User = *(profile.User.U)
	
	// Check if answer and validate Question ID
	if args.PostType==1 {
		if args.QuesID == nil {
			msg := "Invalid Id. Are you trying to panic me? :("
			return &QueryResponse{Status: 302, Msg: &msg}, nil			
		}

		qid, err := strconv.ParseUint(*args.QuesID, 10, 64);
		if err != nil {
			msg := "Invalid Id. Are you trying to panic me? :("
			return &QueryResponse{Status: 302, Msg: &msg}, nil
		} else {
			post.QuesID = qid
		}

		// Get the question post
		ques := model.Post{}
		if r.DB.First(&ques, post.QuesID).RecordNotFound() {
			msg := "Extinct Question. Why are you answering Extinct Questions?"
			return &QueryResponse{Status: 303, Msg: &msg}, nil
		}

		if ques.PostType!=0{
			msg := "Not a Question. Ever heard of Rhetorical Answers?"
			return &QueryResponse{Status: 304, Msg: &msg}, nil
		}
	} else {
		
		if args.Title == nil {
			msg := "No title."
			return &QueryResponse{Status: 307, Msg: &msg}, nil
		}

		post.Title = *args.Title

		if args.Tags.Tag1 !=nil {
			post.Tag1 = *args.Tags.Tag1
		}
		if args.Tags.Tag2 !=nil {
			post.Tag2 = *args.Tags.Tag2
		}
		if args.Tags.Tag3 !=nil {
			post.Tag3 = *args.Tags.Tag3
		}
		if args.Tags.Tag4 !=nil {
			post.Tag4 = *args.Tags.Tag4
		}
		if args.Tags.Tag5 !=nil {
			post.Tag5 = *args.Tags.Tag5
		}		
	}


	post.Body = args.Body

	if err := r.DB.Create(&post).Error; err != nil {
		msg:= "Error while creating post"
		return &QueryResponse{Status: 305, Msg: &msg}, nil
	}

	return &QueryResponse{Status: 300, Msg: nil}, nil
}