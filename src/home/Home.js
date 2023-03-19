import React from "react";
import Blog from "../components/Blog";

const Home = ({ user, loginForm, blogForm, blogs }) => {
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

          <div>{blogForm()}</div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
