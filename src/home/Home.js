import React from "react";
import Blog from "../components/Blog";
//import { InfoOfUser } from "../components/InfoOfUser";

const Home = ({ user, loginForm, logOut, blogForm, blogs }) => {
  return (
    <div>
      {user === null ? (
        <>
          <h2>Log into application</h2>
          {loginForm()}
        </>
      ) : (
        <>
          <h2>Blog</h2>
          {/* <span>{user.name} logged in</span> */}
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

export default Home;
