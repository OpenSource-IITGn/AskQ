package model

import (
	"github.com/jinzhu/gorm"
	// gorm postgres dialect
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"time"
)

// gorm.Model definition
type Model struct {
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt time.Time
}

// User type
type User struct {
	gorm.Model
	ID 			uint64 `gorm:"type:bigint:primary_key"`	
	Email		string `gorm:"type:varchar(100);not null;unique"`
	Password	string `gorm:"not null;type:varchar(100)"`
	UserName	string `gorm:"type:varchar(50);unique;not null;index"`
	FirstName	string `gorm:"type:varchar(50)"`
	LastName 	string `gorm:"type:varchar(50)"`
	Avatar		string `gorm:"type:varchar(4096)"`
}

// Comment Type
type Comment struct {
	gorm.Model
	ID 			uint64 `gorm:"type:bigint:primary_key"`
	User 		User `gorm:"foreignkey:UserID"`
	UserID		uint64
	Body		string `gorm:"type:text";not null`
	PostID		uint64 `gorm:"index;not null"`
}

// Post Type
type Post struct {
	gorm.Model
	ID 			uint64 `gorm:"type:bigint:primary_key"`
	// Defining User
	User 		User `gorm:"foreignkey:UserID"`
	UserID		uint64
	// Base Fields
	Body 		string `gorm:"type:text;not null"`
	Vote		int32
	Title		string `gorm:"type:varchar(1024)"`
	// Comments
	Comments	[]*Comment `gorm:"foreignkey:PostID"`
	// Question Reference
	Ansswers	[]*Post `gorm:"foreignkey:QuesID"`
	QuesID		uint64 `gorm:"index"`
	// Post Type
	PostType	int32 `gorm:"type:smallint;not null"`
	// Tags
	Tag1		string `gorm:"type:varchar(50)"`
	Tag2		string `gorm:"type:varchar(50)"`
	Tag3		string `gorm:"type:varchar(50)"`
	Tag4		string `gorm:"type:varchar(50)"`
	Tag5		string `gorm:"type:varchar(50)"`
}