package resolvers

import (
	"model"

	gorm "github.com/jinzhu/gorm"
)

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

// Get posts general function
func getPostsGen(args GetPostsArgs, tx *gorm.DB, r *Resolvers) (GetPostsResponse, error) {
	posts := []model.Post{}
	if args.Username != nil {
		var user model.User
		if err := r.DB.Order(gorm.Expr("LEVENSHTEIN(user_name, ?) ASC", *args.Username)).Limit(1).Find(&user); err != nil {
			if user.ID > 0 {
				tx = tx.Where("user_id = ?", user.ID)
			}
		}
	}

	if args.Squery != nil {
		tx = tx.Debug().Where("SIMILARITY(CONCAT(title, tag1, tag2, tag3, tag4, tag5), ?) > 0", *args.Squery)
	}

	var postsResponse []*PostResponse
	tx = tx.Limit(args.Limit).Offset(args.Offset).Order("updated_at desc")
	if err := tx.Find(&posts).Error; err != nil {
		msg := "Error while retrieving"
		return GetPostsResponse{Status: 310, Msg: &msg, Posts: postsResponse}, nil
	}

	for i, _ := range posts {
		postsResponse = append(postsResponse, &PostResponse{p: &posts[i], res: r})
	}

	return GetPostsResponse{Status: 300, Msg: nil, Posts: postsResponse}, nil
}

// Get Questions
func (r *Resolvers) GetQuestions(args GetPostsArgs) (GetPostsResponse, error) {
	tx := r.DB.Where("post_type = 0")
	return getPostsGen(args, tx, r)
}

// GetPosts : get Posts
func (r *Resolvers) GetPosts(args GetPostsArgs) (GetPostsResponse, error) {
	tx := r.DB.New()
	return getPostsGen(args, tx, r)
}

type GetPostsArgs struct {
	Squery   *string
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
	Posts  []*PostResponse
}

func (r *GetPostResponse) Ok() int32 {
	return r.Status
}

func (r GetPostResponse) Error() *string {
	return r.Msg
}

func (r GetPostsResponse) Ok() int32 {
	return r.Status
}

func (r GetPostsResponse) Error() *string {
	return r.Msg
}
