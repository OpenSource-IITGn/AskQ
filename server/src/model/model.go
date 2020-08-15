package model

import (
	// gorm postgres dialect
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"time"
)

// User type
type User struct {
	ID uint64 `gorm:"primary_key"`
	Email		string `gorm:"type:varchar(100);not null;unique"`
	Password	string `gorm:"not null;type:varchar(100)"`
	UserName	string `gorm:"type:varchar(50);unique;not null;index"`
	FirstName	string `gorm:"type:varchar(50)"`
	LastName 	string `gorm:"type:varchar(50)"`
	Avatar		string `gorm:"type:varchar(4096)"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

// Comment Type
type Comment struct {
	ID uint64 `gorm:"primary_key"`
	User 		User `gorm:"foreignkey:UserID"`
	UserID		uint64
	Body		string `gorm:"type:varchar(2048)";not null`
	PostID		uint64 `gorm:"index;not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

// Post Type
type Post struct {
	ID uint64 `gorm:"primary_key"`
	// Defining User
	User 		User `gorm:"foreignkey:UserID"`
	UserID		uint64
	Title		string `gorm:"type:varchar(300)"`
	// Post Type
	PostType	int32 `gorm:"type:smallint;not null"`
	// Tags
	Tag1		string `gorm:"type:varchar(50)"`
	Tag2		string `gorm:"type:varchar(50)"`
	Tag3		string `gorm:"type:varchar(50)"`
	Tag4		string `gorm:"type:varchar(50)"`
	Tag5		string `gorm:"type:varchar(50)"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

// Post Details Type
type PostDetails struct {
	Post 	Post `gorm:"foreignkey:PostID;not null"`
	PostID 	uint64 `gorm:"primary_key;auto_increment:false"`
	// Base Fields
	Body 		string `gorm:"type:text;not null"`
	Vote		int32 `gorm:"type:smallint"`
	// Comments
	Comments	[]*Comment `gorm:"foreignkey:PostID"`
	// Question Reference
	Ansswers	[]*Post `gorm:"foreignkey:QuesID"`
	QuesID		uint64 `gorm:"index"`
}

// View State Table
type View struct {
	Post 	Post `gorm:"foreignkey:PostID;not null"`
	PostID 	uint64 `gorm:"primary_key;auto_increment:false"`
	User 	User `gorm:"foreignkey:UserID"`
	UserID	uint64 `gorm:"primary_key;auto_increment:false"`
	State 	int32 `gorm:"type:smallint;not null"`
}