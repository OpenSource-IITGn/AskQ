package model

import (
	"golang.org/x/crypto/bcrypt"
	// gorm postgres dialect
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func (user *User) HashPassword() {
	hash, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)

	user.Password = string(hash)
}

func (user *User) ComparePassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

	if err != nil {
		return false
	}

	return true
}
