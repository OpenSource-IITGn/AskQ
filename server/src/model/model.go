package model

import (
	// gorm postgres dialect
	"time"

	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// base model
type Model struct {
	ID        uint64 `gorm:"primary_key"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

// User type
type User struct {
	Model
	Email     string `gorm:"type:varchar(100);not null;unique"`
	Password  string `gorm:"not null;type:varchar(100)"`
	UserName  string `gorm:"type:varchar(50);unique;not null;index"`
	FirstName string `gorm:"type:varchar(50)"`
	LastName  string `gorm:"type:varchar(50)"`
	Avatar    string `gorm:"type:varchar(4096)"`
}

// Comment Type
type Comment struct {
	Model
	User   User `gorm:"foreignkey:UserID"`
	UserID uint64
	Body   string `gorm:"type:varchar(2048)";not null`
	PostID uint64 `gorm:"index;not null"`
}

// Post Type
type Post struct {
	Model
	// Defining User
	User   User `gorm:"foreignkey:UserID"`
	UserID uint64
	Title  string `gorm:"type:varchar(300)"`
	// Post Type
	PostType int32 `gorm:"type:smallint;not null"`
	// Tags
	Tag1 string `gorm:"type:varchar(50)"`
	Tag2 string `gorm:"type:varchar(50)"`
	Tag3 string `gorm:"type:varchar(50)"`
	Tag4 string `gorm:"type:varchar(50)"`
	Tag5 string `gorm:"type:varchar(50)"`
	// Question Reference
	Answers []*Post `gorm:"foreignkey:QuesID"`
	QuesID   uint64  `gorm:"index"`
	// Votes
	Vote int32  `gorm:"type:smallint"`
}

// Post Details Type
type PostDetails struct {
	Post   Post   `gorm:"foreignkey:PostID;not null"`
	PostID uint64 `gorm:"primary_key;auto_increment:false"`
	// Base Fields
	Body string `gorm:"type:text;not null"`
	// Comments
	Comments []*Comment `gorm:"foreignkey:PostID"`
}

// View State Table
type Vote struct {
	Post   Post   `gorm:"foreignkey:PostID;not null"`
	PostID uint64 `gorm:"primary_key;auto_increment:false"`
	User   User   `gorm:"foreignkey:UserID"`
	UserID uint64 `gorm:"primary_key;auto_increment:false"`
	State  bool  `gorm:"type:smallint;not null"`
}
