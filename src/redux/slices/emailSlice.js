import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emails: [],
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    allEmails(state, action) {
      state.emails = action.payload;
    },
  },
});

export const { allEmails } = emailSlice.actions;

export default emailSlice.reducer;
