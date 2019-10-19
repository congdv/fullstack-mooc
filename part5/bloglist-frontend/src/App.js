import React,{ useState, useEffect } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import { useField } from "./hooks";

const App = () => {
  const username = useField("text");
  const password = useField("password");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const [notification, setNotification] = useState({
    message: null,
  });

  const blogFormRef = React.createRef();

  const notify = (message, type="success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message:null }), 3000);
  };

  const handleLogin = async(event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });
      blogService.setToken(user.token);
      window.localStorage.setItem(
        "loggedBlogListUser", JSON.stringify(user)
      );

      setUser(user);
      console.log(user);
    } catch (exception) {
      console.log("Exception");
      notify("wrong username or password", "error");
    }
  };
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogListUser");
    setUser(null);
  };
  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const hook = () => {
    blogService.getAll().then(initialBlogs => {
      initialBlogs.sort((firstBlog, secondBlog) => {
        return secondBlog.likes - firstBlog.likes;
      });
      setBlogs(initialBlogs);
    });
  };

  useEffect(hook, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser");
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  },[]);


  const rows = () => blogs.map(blog =>
    (<Blog key={blog.id} blog={blog} blogs={blogs} setToBlogs={(blogs) => setBlogs(blogs)} user={user}/>));

  const addBlog = async (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const blogObject = {
      title: title.value,
      url: url.value,
      author: author.value,
    };
    try {
      const savedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(savedBlog));
      notify(`a new blog ${savedBlog.title} by ${savedBlog.author} added`);
      title.reset();
      author.reset();
      url.reset();
    }catch (exception) {
      console.log(exception);
    }
  };
  const creatBlog = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        title = {title}
        author = {author}
        url = {url}
        handleSubmit={addBlog}
      />
    </Togglable>
  );

  const blogList = () => (
    <div>
      {rows()}
    </div>
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      {user === null ? loginForm():
        <div>
          <p>{user.name} logged in</p> <button type="submit" onClick={handleLogout}> Log out </button>
          {creatBlog()}
          {blogList()}
        </div>}
    </div>
  );
};

export default App;
