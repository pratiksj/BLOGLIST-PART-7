import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { increaseLike } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import {
  Typography,
  TextField,
  Button,
  ListItemText,
  Link,
} from "@mui/material";

export const BlogDetails = ({ singleBlog, blogs }) => {
  console.log(singleBlog, "singleBlog from BlogDetails");
  if (!singleBlog) return null;
  const dispatch = useDispatch();

  const newLike = (id) => {
    const updatedLike = blogs.find((blog) => blog.id === id);
    dispatch(increaseLike(updatedLike));
    dispatch(setNotification(`you have like ${updatedLike.title}`, 3));
  };
  //if (!singleBlog) return null;
  const [comments, setComment] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3003/api/blogs/${singleBlog.id}/comments`)
      .then((result) => {
        setComment(result.data);
      });
  }, []);

  const newComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    axios
      .post(`http://localhost:3003/api/blogs/${singleBlog.id}/comments`, {
        comment,
      })
      .then((result) => {
        //setComment([...comments, result.data]);
        setComment(comments.concat(result.data));
      });
    event.target.comment.value = "";
  };

  return (
    <div>
      <Typography
        align="justify"
        variant="h4"
        mt={2}
        fontSize="25px"
        fontStyle="italic"
        fontWeight="bold"
      >
        {singleBlog.title}
      </Typography>
      <Link href="#">{singleBlog.url}</Link>
      &nbsp; &nbsp; &nbsp;{" "}
      <div>
        <Typography
          align="justify"
          variant="h4"
          mt={2}
          fontSize="25px"
          fontStyle="normal"
          fontWeight="bold"
        >
          {singleBlog.likes} likes
        </Typography>
        <Button
          onClick={() => {
            newLike(singleBlog.id); //passing object as argument instead of selected item id
          }}
          variant="contained"
          color="secondary"
          type="submit"
          sx={{ mt: 2 }}
          style={{
            maxWidth: "30px",
            maxHeight: "20px",
            minWidth: "30px",
            minHeight: "25px",
            fontSize: "10px",
            margin: "0 auto",
            display: "flex",
            right: "470px",
            bottom: "30px",
          }}
        >
          like
        </Button>
      </div>
      <Typography
        align="justify"
        variant="h4"
        mt={0.5}
        fontSize="25px"
        fontStyle="normal"
        fontWeight="bold"
      >
        added by {singleBlog.author}
      </Typography>
      <div>
        <strong>comments</strong>
        <form onSubmit={newComment}>
          <TextField
            id="outlined-basic"
            label="Outlined secondary"
            color="secondary"
            focused
            variant="outlined"
            size="small"
            name="comment"
            sx={{ mt: 4 }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fontSize="20px"
            style={{
              margin: "0 auto",
              display: "flex",
              right: "330px",
              bottom: "37px",
            }}
          >
            Add
          </Button>
        </form>
        {comments.map((comment) => {
          return (
            <ListItemText key={comment.id} sx={{ color: "green" }}>
              {comment.comment}
            </ListItemText>
          );
        })}
      </div>
    </div>
  );
};
