const listHelper = require("../utils/list_helper");
const testHelper = require("./test_helper");

test("dummy resturns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);

  expect(result).toBe(1);
});

describe("total likes", () => {
  const blogs = testHelper.initialBlogs;

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  const blog = testHelper.initialOneBlog;

  const blogs = testHelper.initialBlogs;

  test("When list has only one blog", () => {
    const expectedResult = {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
    };
    const result = listHelper.favoriteBlog(blog);
    expect(result).toEqual(expectedResult);
  });

  test("When list has many blog", () => {
    const expectedResult = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(expectedResult);
  });

});

describe("most blogs", () => {
  const blogs = testHelper.initialBlogs;
  const blog = testHelper.initialOneBlog;

  test("When list has only one blog", () => {
    const expectedResult = {
      author: "Michael Chan",
      blogs: 1,
    };
    const result = listHelper.mostBlogs(blog);
    expect(result).toEqual(expectedResult);
  });

  test("When list has many blogs", () => {
    const expectedResult = {
      author: "Robert C. Martin",
      blogs: 3,
    };
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual(expectedResult);
  });
});


describe("most likes", () => {
  const blog = testHelper.initialOneBlog;
  const blogs = testHelper.initialBlogs;
  test("When list has only one blog", () => {
    const expectedResult = {
      author: "Michael Chan",
      likes: 7
    };
    const result = listHelper.mostLikes(blog);
    expect(result).toEqual(expectedResult);
  });

  test("When list has many blogs", () => {
    const expectedResult = {
      author: "Edsger W. Dijkstra",
      likes: 17
    };
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual(expectedResult);
  });
});