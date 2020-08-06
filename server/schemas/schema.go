package schemas

import "io/ioutil"

func NewSchema() *string
{
	b, err := ioutil.ReadFile("schema.graphql")
	return &string(b)
}