import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  //   const response = await axios.get(POST_URL);
  //   return response.data;
  try {
    const response = await axios.get(POST_URL);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    try {
      const response = await axios.post(POST_URL, initialPost);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);
// [
//   {
//     id: "1",
//     title: "Learning Redux Toolkit",
//     content: "I have heard good things.",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },
//   {
//     id: "2",
//     title: "Slices...",
//     content: "The more I say slice, the more i want pizza.",
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },
// ];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const exisitingPost = state.find((post) => post.id === postId);
      if (exisitingPost) {
        exisitingPost.reactions[reaction]++;
      }
    },
    extraReducers(builder) {
      builder
        .addCase(fetchPosts.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = "succeeded";
          //Adding data and reactions
          let min = 1;
          const loadedPosts = action.payload.map((post) => {
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
            post.reactions = {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            };
            return post;
          });
          //Add any fetched posts to the array
          state.posts = state.posts.concat(loadedPosts);
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
          action.payload.userId = Number(action.payload.userId);
          action.payload.date = new Date().toISOString();
          action.payload.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          };
          console.log(action.payload);
          state.posts.push(action.payload);
        });
    },
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
