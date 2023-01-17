import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  //initialState: null,
  initialState: null,
  reducers: {
    // setMessage(state, action) {
    //   const message = action.payload;
    //   return message;
    // },
    // removeMessage() {
    //   return null;
    // },
    setErrorMessage(state, action) {
      //const message = action.payload;
      return action.payload;
    },
    removeMessage() {
      return null;
    },
  },
});

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch(setErrorMessage(notification));
    setTimeout(() => {
      dispatch(removeMessage());
    }, time * 1000);
  };
};

export const { setErrorMessage, removeMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
