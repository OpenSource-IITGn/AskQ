package resolvers

import "model"

func (r *Resolvers) GetPostDetailsByID(args struct{ Id string }) (*GetPostResponse, error) {
	post := model.Post{}
	if r.DB.Where("id = ?", args.Id).First(&post).RecordNotFound() {
		msg := "Not Found. Are you trying something you are not meant to?"
		return &GetPostResponse{Status: 301, Msg: &msg, Post: nil}, nil
	} else if post.PostType != 0 {
		msg2 := "No Question Found. Are you trying something you are not meant to?"
		return &GetPostResponse{Status: 301, Msg: &msg2, Post: nil}, nil
	}

	return &GetPostResponse{Status: 300, Msg: nil, Post: &PostResponse{p: &post, res: r}}, nil
}

// func (r *Resolvers) GetQuestions(args GetPostsArgs) (*GetPostsResponse, error) {

// }

// GetPosts : get Posts
func (r *Resolvers) GetPosts(args GetPostsArgs) (*GetPostsResponse, error) {
	posts := []model.Post{}

	if args.Username == nil || *args.Username == "" {

		if r.DB.Limit(args.Limit).Offset(args.Offset).Find(&posts).RecordNotFound() {
			msg := "Not Questions Found"
			return &GetPostsResponse{Status: 301, Msg: &msg, Posts: nil}, nil
		}
		var postsResponse []*PostResponse

		for i := 0; i < len(posts); i++ {
			postsResponse = append(postsResponse, &PostResponse{p: &posts[i], res: r})
		}

		return &GetPostsResponse{Status: 300, Msg: nil, Posts: &postsResponse}, nil

	} else {
		if r.DB.Limit(args.Limit).Offset(args.Offset).Where("username = ?", *args.Username).Find(&posts).RecordNotFound() {
			msg := "Not Questions Found"
			return &GetPostsResponse{Status: 301, Msg: &msg, Posts: nil}, nil
		}
		var postsResponse []*PostResponse

		for i := 0; i < len(posts); i++ {
			postsResponse = append(postsResponse, &PostResponse{p: &posts[i], res: r})
		}
		return &GetPostsResponse{Status: 300, Msg: nil, Posts: &postsResponse}, nil
	}
}

type GetPostsArgs struct {
	Limit    int32
	Offset   int32
	Username *string
}

type GetPostResponse struct {
	Status int32
	Msg    *string
	Post   *PostResponse
}

type GetPostsResponse struct {
	Status int32
	Msg    *string
	Posts  *[]*PostResponse
}

func (r *GetPostResponse) Ok() int32 {
	return r.Status
}

func (r *GetPostResponse) Error() *string {
	return r.Msg
}

func (r *GetPostsResponse) Ok() int32 {
	return r.Status
}

func (r *GetPostsResponse) Error() *string {
	return r.Msg
}
