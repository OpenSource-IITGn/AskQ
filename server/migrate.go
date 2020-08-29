package main

import(
	"db"
	"model"
)

func main() {
	d, err := db.ConnectDB()

	if err != nil {
		panic(err)
	}

	defer d.Close()

	d.DropTableIfExists(&model.User{})
	d.DropTableIfExists(&model.Comment{})
	d.DropTableIfExists(&model.Post{})
	d.DropTableIfExists(&model.PostDetails{})
	d.DropTableIfExists(&model.Vote{})
	d.CreateTable(&model.User{})
	d.CreateTable(&model.Comment{})
	d.CreateTable(&model.Post{})
	d.CreateTable(&model.PostDetails{})
	d.CreateTable(&model.Vote{})
}