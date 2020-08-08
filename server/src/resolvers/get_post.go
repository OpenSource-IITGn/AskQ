package resolvers

import "model"

func (r *Resolvers) GetPostDetailsByID(args struct {Id string}) (*GetPostResponse, error) {
	post := model.Post{}
	if r.DB.Where("id = ?", args.Id).First(&post).RecordNotFound() {
		msg := "Not Found. Are you trying something you are not meant to?"
		return &GetPostResponse{Status: 301, Msg: &msg, Post: nil}, nil
	}

	return &GetPostResponse{Status : 300, Msg: nil, Post: &PostResponse{p: &post, res: r}}, nil
}


type GetPostsArgs struct {
	Query string
	First int32
}

type GetPostResponse struct {
	Status		int32
	Msg			*string
	Post 		*PostResponse
}

type GetPostsResponse struct {
	Status		bool
	Msg			*string
	Posts 		[]*PostResponse
}

func (r *GetPostResponse) Ok () int32 {
	return r.Status
}

func (r *GetPostResponse) Error () *string {
	return r.Msg
}