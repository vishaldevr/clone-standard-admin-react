import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import emailSlice from "./slices/emailSlice";
import settingSlice from "./slices/settingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailSlice,
    setting: settingSlice,
  },
});

export default store;
