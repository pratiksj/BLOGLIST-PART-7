import { useState } from "react";
//import blogService from "../services/blogs";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increaseLike, deletedBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  //console.log("america", blogs);

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

  const newLike = (id) => {
    const updatedLike = blogs.find((blog) => blog.id === id);
    dispatch(increaseLike(id));
    dispatch(setNotification(`you have like ${updatedLike.title}`, 3));
  };

  const blogToDelete = async (id) => {
    const blogToRemove = blogs.find((blog) => blog.id === id);
    //console.log("thailand", blogToRemove);
    const result = window.confirm(
      `remove the ${blogToRemove.title}by ${blogToRemove.author}`
    );
    console.log("this from result", result);

    if (result) {
      dispatch(deletedBlog(id));
    }
    dispatch(setNotification(` you have deleted ${blogToRemove.title}`, 3));
  };

  return (
    <div style={blogStyle} key={blog}>
      {!disPlay ? (
        <div>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>

          <button onClick={showToggle}>view</button>
        </div>
      ) : (
        <div>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          <button id="Hide" onClick={showToggle}>
            Hide
          </button>
          <div>{blog.author}</div>
          <div className="url">{blog.url}</div>
          <div id="like">
            likes {blog.likes}
            <button onClick={() => newLike(blog.id)}>like</button>
          </div>
          {blog.user === user.id || blog.user.id ? (
            <button
              style={{ backgroundColor: "red" }}
              onClick={() => blogToDelete(blog.id)}
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
