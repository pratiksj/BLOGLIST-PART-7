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
import { increaseLike, deletedBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const [disPlay, setDisPlay] = useState(false);

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
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {!disPlay ? (
              <TableRow key={blog.id}>
                <div>
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
                  {/* <button onClick={showToggle}>view</button> */}
                </div>
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
                {/* <button id="Hide" onClick={showToggle}>
            Hide
          </button> */}
                <div>{blog.author}</div>
                <div className="url">{blog.url}</div>
                <div id="like">
                  likes {blog.likes}
                  <Button
                    onClick={() => newLike(blog.id)}
                    variant="contained"
                    color="secondary"
                    type="submit"
                    style={{
                      maxWidth: "37px",
                      maxHeight: "30px",
                      minWidth: "30px",
                      minHeight: "30px",
                      fontSize: "10px",
                    }}
                  >
                    like
                  </Button>
                  {/* <button onClick={() => newLike(blog.id)}>like</button> */}
                </div>
                {blog.user === user.id || blog.user.id ? (
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
                null}
              </div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blog;

// {/* <div style={blogStyle} key={blog}>
//       {!disPlay ? (
//         <div>
//           <Link to={`/blogs/${blog.id}`}>
//             {blog.title} {blog.author}
//           </Link>
//           <Button
//             onClick={showToggle}
//             variant="contained"
//             color="primary"
//             type="submit"
//           >
//             view
//           </Button>
//           {/* <button onClick={showToggle}>view</button> */}
//         </div>
//       ) : (
//         <div>
//           <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
//           <Button
//             onClick={showToggle}
//             variant="contained"
//             color="secondary"
//             type="submit"
//           >
//             Hide
//           </Button>
//           {/* <button id="Hide" onClick={showToggle}>
//             Hide
//           </button> */}
//           <div>{blog.author}</div>
//           <div className="url">{blog.url}</div>
//           <div id="like">
//             likes {blog.likes}
//             <Button
//               onClick={() => newLike(blog.id)}
//               variant="contained"
//               color="secondary"
//               type="submit"
//               style={{
//                 maxWidth: "37px",
//                 maxHeight: "30px",
//                 minWidth: "30px",
//                 minHeight: "30px",
//               }}
//             >
//               like
//             </Button>
//             {/* <button onClick={() => newLike(blog.id)}>like</button> */}
//           </div>
//           {blog.user === user.id || blog.user.id ? (
//             <Button
//               onClick={() => blogToDelete(blog.id)}
//               variant="contained"
//               color="error"
//               type="submit"
//             >
//               remove
//             </Button>
//           ) : // <button
//           //   style={{ backgroundColor: "red" }}
//           //   onClick={() => blogToDelete(blog.id)}
//           // >
//           //   remove
//           // </button>
//           null}
//         </div>
//       )}
//     </div> */}
