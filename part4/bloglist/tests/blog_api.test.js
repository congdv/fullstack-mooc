const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const testHelper = require("./test_helper");

beforeEach(async() => {
  await Blog.deleteMany({});
  const blogObjects = testHelper.initialBlogs.map(blog => new Blog(blog));
  const promissArray = blogObjects.map(blog => blog.save());
  await Promise.all(promissArray);
});

describe("When there is initially some blogs saved", () => {
  test("Blogs are returned as json", async() => {
    await api.get("/api/blogs").expect(200).expect("Content-Type", /application\/json/);
  });
});

describe("Checking a specific blog", () => {
  test("Unique identifier property of the blog", async() => {
    await api.get("/api/blogs").expect(200).expect("Content-Type", /application\/json/);
    const res = await api.get("/api/blogs");
    const blogs = res.body;
    blogs.map(blog => expect(blog._id).toBeDefined());
  });
});

describe("Addition of a new blog", () => {
  test("Add new blog post", async() => {
    const newBlog = {
      title: "Taking a year to explain computer things",
      author: "Julia Evans",
      url: "https://jvns.ca/blog/2019/09/13/a-year-explaining-computer-things/"
    };
    await api.post("/api/blogs").send(newBlog).expect(200).expect("Content-type", /application\/json/);
    const blogsAtEnd = await testHelper.blogsInDB();
    const blogTitles = blogsAtEnd.map(blog => blog.title);
    expect(blogTitles).toContain(newBlog.title);
  });

  test("likes propertys default equal 0", async() => {
    const newBlog = {
      title: "Taking a year to explain computer things",
      author: "Julia Evans",
      url: "https://jvns.ca/blog/2019/09/13/a-year-explaining-computer-things/"
    };
    const addedBlog = await api.post("/api/blogs").send(newBlog).expect(200).expect("Content-type", /application\/json/);
    expect(addedBlog.body.likes).toEqual(0);
  });
  test("Endpoint request", async() => {
    const newBlog = {
      author: "Julia Evans",
    };
    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("Update a new blog", () => {
  test("Update likes of a blog", async () => {
    const blog = testHelper.initialBlogs[0];
    blog.likes = 999;

    const updatedBlog = await api.put(`/api/blogs/${blog._id}`).send(blog);
    expect(updatedBlog.body.likes).toEqual(blog.likes);
  });
});

describe("deletion of a blog", () => {
  test("deleting a blog", async () => {
    const blog = testHelper.initialBlogs[0];
    await api.delete(`/api/blogs/${blog._id}`).expect(204);
  });
});







afterAll(() => {
  mongoose.connection.close();
});