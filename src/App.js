import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import loginService from "./services/login";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { initializedBlog, createBlog } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";

const App = () => {
  const noteFormRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  console.log("this is user", user);
  console.log("this is from database", blogs);

  useEffect(() => {
    console.log("this is from useeffect");
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
    dispatch(initializedBlog());
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      dispatch(setUser(user));
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      dispatch(setNotification(`${user.name} has login successfully`, 3));
    } catch (exception) {
      dispatch(setNotification("wrong username or password", 3));
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
    dispatch(setUser(null));
    //setUser(null);
  };

  const addBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject));
      //dispatch(setNotification(`Added`, 3));
      noteFormRef.current.toggleVisibility();
    } catch (exception) {
      dispatch(
        setNotification(
          "Title or author must contain more than 5 character ",
          3
        )
      );
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={noteFormRef}>
      <BlogForm createBlog={addBlog} />
      {/* <BlogForm /> */}
    </Togglable>
  );

  //const sortedBlog = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Notification />

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
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              // setBlogs={setBlogs}
              // blogs={blogs}
              user={user}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
