import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../features/posts/postSlice";
// import counterSlice from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    // counter: counterSlice,
    posts: postSlice,
  },
});
