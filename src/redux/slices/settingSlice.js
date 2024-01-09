import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  setting: "",
  logo: null,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    getSetting(state, action) {
      state.setting = action.payload;
    },
    changeLogo(state, action) {
      state.logo = action.payload;
    },
  },
});

export const { getSetting, changeLogo } = settingSlice.actions;

export default settingSlice.reducer;
