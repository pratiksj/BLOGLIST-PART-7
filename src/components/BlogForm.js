import React from "react";
import { Button, TextField } from "@mui/material";

import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addUpBlog = (event) => {
    event.preventDefault();

    createBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h1>create a Blog</h1>
      <form onSubmit={addUpBlog}>
        <div>
          <TextField
            name="title"
            label="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>

        <div>
          <TextField
            name="author"
            label="author"
            value={author}
            onChange={(event) => {
              setAuthor(event.target.value);
            }}
          />
        </div>

        <div>
          <TextField
            name="url"
            label="url"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
            }}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Add
        </Button>
      </form>
    </>
  );
};
export default BlogForm;
