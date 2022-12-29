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
  },
});

export const { appendBlog, setBlog } = blogSlice.actions;
export default blogSlice.reducer;

export const initializedBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    console.log("annitya", blogs);
    dispatch(setBlog(blogs));
  };
};
