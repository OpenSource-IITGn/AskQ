package model

import (
	"golang.org/x/crypto/bcrypt"
	// gorm postgres dialect
	_ "github.com/jinzhu/gorm/dialects/postgres"
)


func (user *User) HashPassword() bool {
	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)

	if err != nil{
		return false
	}

	user.Password = string(hash)

	return true
}


func (user *User) ComparePassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

	if err != nil {
		return false
	}

	return true
}