package handler

import (
	"bytes"
	"fmt"
	"net/http"
	"strconv"
	"context"
	"errors"
)

func respond(w http.ResponseWriter, body []byte, code int) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.WriteHeader(code)
	_, _ = w.Write(body)
}

func errorJSON(msg string) []byte {
	buf := bytes.Buffer{}
	fmt.Fprintf(&buf, `{"error": "%s"}`, msg)
	return buf.Bytes()
}

func GetUid(ctx context.Context) (uint64, error) {
	userID := ctx.Value(ContextKey("userID"))
	if userID == nil {
		return 0, errors.New("Null context")
	}
	uid, err := strconv.ParseUint(userID.(string), 10, 64)
	return uid, err
} 