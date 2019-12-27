const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogRouter.get("/:id", async (request, response) => {
  console.log("getdfsfsdfsf");
  const blog = await Blog.findById(request.params.id).populate("user", { username: 1, name: 1 }).populate("comments",{ content:1 });
  response.json(blog.toJSON());
});

blogRouter.post("/",async (request, response, next) => {
  const body = request.body;
  const newBlog = request.body;
  newBlog.likes = newBlog.likes === undefined ? 0 : newBlog.likes;
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if(!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid " });
    }

    const user = await User.findById(decodedToken.id);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: newBlog.likes,
      user: user
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog.toJSON());
  } catch(error) {
    next(error);
  }
});

blogRouter.post("/comment", async(request, response, next) => {
  console.log(request.body);
  console.log(request.token);
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    console.log("token ",decodedToken);
    if(!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid " });
    }
    const user = await User.findById(decodedToken.id);
    const comment = new Comment({
      content: request.body.content,
      user: user
    });
    const savedComment = await comment.save();
    console.log(request.body.blogId,"blog id");

    const blog = await Blog.findById(request.body.blogId);
    console.log(blog);
    blog.comments = blog.comments.concat(savedComment._id);
    await blog.save();
    response.json(savedComment.toJSON());

  }catch(error) {
    next(error);
  }
});

blogRouter.delete("/:id", async(request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if(!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid " });
    }
    //find blog by blog id to get user
    const blog = await Blog.findById(request.params.id);
    const userid = decodedToken.id;
    if(blog.user.toString() === userid.toString()) {
      //only user own the blog can delete it
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      response.status(403).send({ error: "Forbidden" } );
    }
  } catch(error) {
    next(error);
  }
});

blogRouter.put("/:id", async(request, response, next) => {
  const foundBlog = await Blog.findById(request.params.id);
  foundBlog.likes = request.body.likes;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(foundBlog.id, foundBlog, { new : true });
    console.log("Updated "+updatedBlog);
    response.json(updatedBlog.toJSON());
  }catch(error) {
    next(error);
  }
});

module.exports = blogRouter;