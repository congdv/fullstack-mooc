const lodashArray = require("lodash/collection");
const lodashMath = require("lodash/math");
// eslint-disable-next-line no-unused-vars
const dummy =  (blogs) => {
  return 1;
};

const totalLikes = blogs => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  return blogs.reduce(reducer,0);
};

const favoriteBlog = blogs => {
  const mostLikes = Math.max(...blogs.map( blog => blog.likes));
  const blogHasMostLikes =  blogs.find(blog => blog.likes === mostLikes);
  return {
    title: blogHasMostLikes.title,
    author: blogHasMostLikes.author,
    likes:blogHasMostLikes.likes
  };
};

const mostBlogs = blogs => {
  const authors = blogs.map(blog => blog.author);
  const numBlogsOfAuthors = lodashArray.map(lodashArray.countBy(authors),( value, key) => ({
    author:key,
    blogs:value
  }));

  return lodashMath.maxBy(numBlogsOfAuthors, item => item.blogs);

};

const mostLikes = blogs => {
  let authors = [];
  blogs.forEach(blog => {
    if((authors.filter(author => author.author === blog.author)).length === 0) {
      authors.push({
        author: blog.author,
        likes: blog.likes
      });
    } else {
      const indexAuthor = authors.findIndex(author => author.author === blog.author);
      authors[indexAuthor].likes += blog.likes;
    }
  });
  return lodashMath.maxBy(authors, author => author.likes);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};