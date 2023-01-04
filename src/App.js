import { useState, useEffect, useRef } from "react";
// import Blog from "./components/Blog";
import userService from "./services/users";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
//import { InfoOfUser } from "./components/InfoOfUser";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import loginService from "./services/login";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { initializedBlog, createBlog } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { Routes, Route } from "react-router-dom";
import User from "./components/User";
import Home from "./home/Home";

const App = () => {
  const noteFormRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [listOfUser, setListOfUser] = useState([]);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log("this is from useeffect");
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
    dispatch(initializedBlog());
  }, []);

  useEffect(() => {
    userService.getAll().then((result) => {
      setListOfUser(result);
    });
  }, []);

  console.log(listOfUser);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      dispatch(setUser(user));
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
      {/* <Link to="/users">users</Link> */}
      <Routes>
        <Route path="/users" element={<User listOfUser={listOfUser} />} />
        <Route
          path="/"
          element={
            <Home
              user={user}
              loginForm={loginForm}
              logOut={logOut}
              blogForm={blogForm}
              blogs={blogs}
            />
          }
        />
      </Routes>

      {/* {user === null ? (
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
      )} */}
    </div>
  );
};

export default App;
