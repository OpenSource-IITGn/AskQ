package schemas

import "io/ioutil"

func NewSchema() *string {
	b, _ := ioutil.ReadFile("schema.graphql");
	
	str := string(b);
	
	return &str;
}