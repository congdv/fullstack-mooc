const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (request, response) => {
  Blog.find({}).then( blogs => {
    response.json(blogs.map(blog => blog.toJSON()));
  });
});

blogRouter.post("/", (request, response, next) => {
  const blog = new Blog(request.body);

  blog.save().then( result => {
    response.status(201).json(result.toJSON());
  }).then(savedAndFormatedBlog => {
    response.status(201).json(savedAndFormatedBlog);
  }).catch(error => next(error));
});

module.exports = blogRouter;