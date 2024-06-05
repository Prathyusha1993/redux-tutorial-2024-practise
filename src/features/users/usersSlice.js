import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Navitha Kurigala" },
  { id: "1", name: "Subhashini Reddivari" },
  { id: "0", name: "Kiran Digavinti" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;
