package model

import (
	"github.com/jinzhu/gorm"
	// gorm postgres dialect
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"time"
)

// gorm.Model definition
type Model struct {
  ID        uint `gorm:"primary_key"`
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt time.Time
}

// User type
type User struct {
	gorm.Model
	Email		string `gorm:"type:varchar(100);not null;unique"`
	Password	string `gorm:"not null"`
	UserName	string `gorm:"type:varchar(50);unique;not null;index"`
	FirstName	string `gorm:"type:varchar(50)"`
	LastName 	string `gorm:"type:varchar(50)"`
	Avatar		string
}

// Comment Type
type Comment struct {
	gorm.Model
	User 		User
	Body		string `gorm:"type:text";not null`
	Post		Post
}

// Post Type
// TODO : Add enum type
type Post struct {
	gorm.Model
	User 		User
	Body 		string `gorm:"type:text;not null"`
	Vote		int
	Title		string `gorm:"type:varchar(1024)"`
	Answers		[]Post
	Comments	[]Comment
	Tags		string `gorm:"type:varchar(1024)"`
}