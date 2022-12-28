import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, blogs, user, increaseLike }) => {
  const [disPlay, setDisPlay] = useState(false);

  const blogStyle = {
    //paddingTop: 8,
    // paddingLeft: 2,
    //paddingRight: 2,
    border: "solid",
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 5,
  };

  const showToggle = () => {
    setDisPlay(!disPlay);
  };

  const deletedBlog = async (id) => {
    const blogToRemove = blogs.find((blog) => blog.id === id);
    const result = window.confirm(
      `remove the ${blogToRemove.title}by ${blogToRemove.author}`
    );

    if (result) {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <div style={blogStyle} key={blog}>
      {!disPlay ? (
        <div className="blog">
          {blog.title} {blog.author}
          <button id="view" className="view" onClick={showToggle}>
            view
          </button>
        </div>
      ) : (
        <div className="blog">
          {blog.title}
          <button id="Hide" onClick={showToggle}>
            Hide
          </button>
          <div>{blog.author}</div>
          <div className="url">{blog.url}</div>
          <div id="like">
            likes {blog.likes}
            <button id="likeButton" onClick={() => increaseLike(blog.id)}>
              like
            </button>
          </div>
          {blog.user === user.id || blog.user.id ? (
            <button
              style={{ backgroundColor: "red" }}
              onClick={() => deletedBlog(blog.id)}
            >
              remove
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Blog;
