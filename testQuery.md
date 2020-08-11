mutation {
  createPost(
    posttype: 0,
    quesid: "sdasdsa2s",
    title: "The first ever question",
    body: "lorem ipsum..............s asd s.a.asd. as.d .s",
    tags: {
      tag1: "tag1",
      tag2: "sdf",
      tag3: "asdas"
    }
  ) {
    ok,
    error
  }
}
