import React from "react";
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
          title:{""}
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            placeholder="title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>

        <div>
          author:{""}
          <input
            id="author"
            type="text"
            name="author"
            value={author}
            placeholder="author"
            onChange={(event) => {
              setAuthor(event.target.value);
            }}
          />
        </div>

        <div>
          Url:{""}
          <input
            id="Url"
            type="text"
            name="url"
            value={url}
            placeholder="url"
            onChange={(event) => {
              setUrl(event.target.value);
            }}
          />
        </div>

        <button id="submit" type="submit">
          Add
        </button>
      </form>
    </>
  );
};
export default BlogForm;
