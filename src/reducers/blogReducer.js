import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

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
      console.log(action.payload, "i am payload");
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    deleteBlog(state, action) {
      const id = action.payload;
      const blogToRemove = state.filter((blog) => blog.id !== id);
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
    dispatch(setBlog(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    console.log(newBlog.error, "this id new");

    if (newBlog.error) {
      console.log("erorojfsdajfsfsfjlsj");
      dispatch(setNotification(newBlog.error, 2));
    } else {
      console.log("error didnot occur");
      dispatch(appendBlog(newBlog));
    }
    console.log("outside if else");
  };
};

export const increaseLike = (obj) => {
  console.log(obj, "this is id from increaselike function");
  return async (dispatch) => {
    const likedBlog = {
      ...obj,
      likes: obj.likes + 1,
    };
    const response = await blogService.update(obj.id, likedBlog);
    dispatch(voteOf(response));
  };
};
