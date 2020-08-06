package resolvers

import "resolvers"

func (r *Resolvers) GetPosts(args getPostsArgs)


type getPostsArgs struct {
	Query		string
	First		int
	Offset		int
	User		unit
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