import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const noteFormRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [message, setErrorMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  //const [color, setColor] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const logOut = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  const increaseLike = async (id) => {
    const blogUpdate = blogs.find((blogs) => blogs.id === id);
    const updatedBlog = {
      likes: blogUpdate.likes + 1,
      author: blogUpdate.author,
      title: blogUpdate.tittle,
      url: blogUpdate.url,
    };
    const response = await blogService.update(id, updatedBlog);
    // const tosetlikeBlog = blogs.map((blog) =>
    //   blog.id === id ? response : blogs
    // );
    setBlogs(blogs.map((blogs) => (blogs.id === id ? response : blogs)));
    //setBlogs(tosetlikeBlog);
  };

  const addBlog = async (blogObject) => {
    try {
      const returnedNote = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedNote));
      noteFormRef.current.toggleVisibility();
    } catch (exception) {
      setErrorMessage({ message: "this is error" });
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={noteFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
    // <BlogForm createBlog={addBlog} />
  );

  const sortedBlog = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Notification message={message} />

      {user === null ? (
        <>
          <h2>Log into application</h2>
          {loginForm()}
        </>
      ) : (
        <>
          <h2>Blog</h2>
          <span>{user.name} logged in</span>
          <button onClick={logOut}>logout</button>
          {blogForm()}
          {sortedBlog.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              setBlogs={setBlogs}
              blogs={blogs}
              user={user}
              increaseLike={increaseLike}
            />
          ))}
          {/* <Blog blog={blogs} /> */}
        </>
      )}
    </div>
  );
};

export default App;
