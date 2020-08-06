package resolvers

//func (r *Resolvers) GetPosts(args getPostsArgs)


type GetPostsArgs struct {
	Query		string
	First		int
	Offset		int
	User		uint
}

type GetPostsResponse struct {
	Status		bool
	Msg			*string
	Posts 		[]PostResponse
}

func (r *GetPostsResponse) Ok () bool {
	return r.Status
}

func (r *GetPostsResponse) Error () *string {
	return r.Msg
}