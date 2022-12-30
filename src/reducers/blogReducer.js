import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return [...state, action.payload];
    },
    setBlog(state, action) {
      return action.payload;
    },
    voteOf(state, action) {
      const id = action.payload;
      const blogToLike = state.find((n) => n.id === id);
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : likedBlog));
    },
    deleteBlog(state, action) {
      const id = action.payload;
      const blogToRemove = state.filter((blog) => blog.id !== id);
      //console.log("this is delete", blogToRemove);
      return blogToRemove;
    },
  },
});

export const { appendBlog, setBlog, voteOf, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;

export const deletedBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(deleteBlog(id));
  };
};

export const initializedBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    console.log("annitya", blogs);
    dispatch(setBlog(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const increaseLike = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getAll();
    const blogToLike = blog.find((blog) => blog.id === id);
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    };
    const response = await blogService.update(id, likedBlog);
    dispatch(voteOf(response.id));
  };
};
