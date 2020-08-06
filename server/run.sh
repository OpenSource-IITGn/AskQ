export GOPATH=$PWD
cat $PWD/src/schemas/schemas/*.graphql > $PWD/schema.graphql
go run server.go
