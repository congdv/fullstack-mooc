const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");




blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogRouter.post("/",async (request, response, next) => {
  const body = request.body;
  const newBlog = request.body;
  newBlog.likes = newBlog.likes === undefined ? 0 : newBlog.likes;
  console.log(request);
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if(!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid " });
    }

    const user = await User.findById(body.userId);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: newBlog.likes,
      user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog.toJSON());
  } catch(error) {
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
    console.log(blog.user.toString() +" Compare to "+ decodedToken.id);
    console.log(decodedToken);
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