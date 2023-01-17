import { useState } from "react";
import {
  Button,
  //Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deletedBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const [disPlay, setDisPlay] = useState(false);

  const showToggle = () => {
    setDisPlay(!disPlay);
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
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {!disPlay ? (
              <TableRow key={blog.id} sx={{ border: "none" }}>
                {/* <div> */}
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} {blog.author}
                  </Link>
                  <Button
                    onClick={showToggle}
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{
                      position: "absolute",
                      //top: "254px",
                      left: "500px",
                    }}
                  >
                    view
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              <div>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                <Button
                  onClick={showToggle}
                  variant="contained"
                  color="secondary"
                  type="submit"
                  style={{
                    maxWidth: "40px",
                    maxHeight: "30px",
                    minWidth: "30px",
                    minHeight: "30px",
                    fontSize: "10px",
                  }}
                >
                  Hide
                </Button>
                <div>{blog.author}</div>
                <div className="url">{blog.url}</div>
                <div id="like">
                  likes {blog.likes}
                  <Button
                    onClick={() => blogToDelete(blog.id)}
                    variant="contained"
                    color="error"
                    type="submit"
                    style={{
                      maxWidth: "45px",
                      maxHeight: "30px",
                      minWidth: "30px",
                      minHeight: "30px",
                      fontSize: "10px",
                    }}
                  >
                    remove
                  </Button>
                </div>
                {/* {blog.user === user.id || blog.user.id ? (
                  <Button
                    onClick={() => blogToDelete(blog.id)}
                    variant="contained"
                    color="error"
                    type="submit"
                    style={{
                      maxWidth: "45px",
                      maxHeight: "30px",
                      minWidth: "30px",
                      minHeight: "30px",
                      fontSize: "10px",
                    }}
                  >
                    remove
                  </Button>
                ) : // <button
                //   style={{ backgroundColor: "red" }}
                //   onClick={() => blogToDelete(blog.id)}
                // >
                //   remove
                // </button>
                null} */}
              </div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blog;
