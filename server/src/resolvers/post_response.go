package resolvers

import (
	"fmt"
	"model"
)

// PostResponse is the post response type
type PostResponse struct {
	p   *model.Post
	res *Resolvers
	pd  *model.PostDetails
}

// Get PostDetails
func getpostdet(p *model.Post, res *Resolvers) *model.PostDetails {
	postdet := model.PostDetails{}
	res.DB.First(&postdet, p.ID)
	return &postdet
}

// ID for PostResponse
func (r *PostResponse) ID() string {
	return fmt.Sprint(r.p.ID)
}

// CreatedAt for PostResponse
func (r *PostResponse) CreatedAt() string {
	return r.p.CreatedAt.String()
}

// UpdatedAt for PostResponse
func (r *PostResponse) UpdatedAt() string {
	return r.p.UpdatedAt.String()
}

// Votes for PostResponse
func (r *PostResponse) Vote() int32 {
	// if r.pd == nil {
	// 	r.pd = getpostdet(r.p, r.res)
	// }
	return r.p.Vote
}

// PostType for PostResponse
func (r *PostResponse) PostType() int32 {
	return r.p.PostType
}

// Title for PostResponse
func (r *PostResponse) Title() *string {
	return &r.p.Title
}

// Body for PostResponse
func (r *PostResponse) Body() *string {
	if r.pd == nil {
		r.pd = getpostdet(r.p, r.res)
	}
	return &r.pd.Body
}

// Tags for PostResponse
func (r *PostResponse) Tags() []*string {
	var tags []*string
	tags = append(tags, &r.p.Tag1)
	tags = append(tags, &r.p.Tag2)
	tags = append(tags, &r.p.Tag3)
	tags = append(tags, &r.p.Tag4)
	tags = append(tags, &r.p.Tag5)
	return tags
}

// User for PostResponse
func (r *PostResponse) User() *UserResponse {
	user := model.User{}
	if err := r.res.DB.Model(r.p).Related(&user, "User").Error; err != nil {
		return nil
	}
	return &UserResponse{U: &user}
}

// Answers for PostResponse
func (r *PostResponse) Answers() []*PostResponse {
	if r.p.PostType != 0 {
		return nil
	}

	var posts []*model.Post
	if err := r.res.DB.Model(r.p).Related(&posts, "Answers").Error; err != nil {
		return nil
	}

	var ans []*PostResponse
	for _, v := range posts {
		if v.PostType == 1 {
			ans = append(ans, &PostResponse{p: v, res: r.res})
		}
	}

	return ans
}

// Comments for PostResponse
func (r *PostResponse) Comments() []*CommentResponse {
	if r.pd == nil {
		r.pd = getpostdet(r.p, r.res)
	}

	var coms []*model.Comment
	if err := r.res.DB.Model(r.pd).Related(&coms, "Comments").Error; err != nil {
		return nil
	}

	var comments []*CommentResponse
	for _, v := range coms {
		comments = append(comments, &CommentResponse{p: v, res: r.res})
	}

	return comments
}
