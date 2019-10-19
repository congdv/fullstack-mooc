import React,{ useState } from "react";
import BlogService from "../services/blogs";

const Blog = ({ blog , blogs, setToBlogs, user }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(0);
  const showWhenVisible = { display: visible ? "":"none" };


  const blogStyle = {
    paddingTop:10,
    paddingLeft: 2,
    border:"solid",
    borderWidth:1,
    marginBottom:5
  };

  const toggleVisibility = () => {
    if(!visible){
      setLikes(blog.likes);
    }
    setVisible(!visible);
    console.log(likes +" likes");
  };

  const handleLikeOnClick = async() => {
    setLikes(likes+1);
    const newObject = {
      likes: likes+1,
    };
    await BlogService.update(blog.id,newObject);
  };

  const handleRemoveBlog = async() => {
    const message = `remove ${blog.title} by ${blog.author}`;
    if(window.confirm(message)) {
      await BlogService.deleteBlog(blog.id);
      setToBlogs(blogs.filter(b => b.id !== blog.id));
    }
  };
  const removableBlog = () => {
    if(typeof blog.user === "undefined") {
      return (<button onClick={handleRemoveBlog}>remove</button>);
    } else if(user.username === blog.user.username) {
      return (<button onClick={handleRemoveBlog}>remove</button>);
    }
  };

  return (
    <div style={blogStyle} className=".blog">
      <div onClick={toggleVisibility} className="togglable">
        {blog.title}
      </div>
      <div style={showWhenVisible} className="invisibility">
        {blog.url}<br/>
        {likes} likes <button onClick={handleLikeOnClick}>like</button><br/>
        {blog.author}<br/>
        {removableBlog()}
      </div>
    </div>
  );
};


export default Blog;