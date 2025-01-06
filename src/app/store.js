import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authSlice from "../features/auth/authSlice";
import conversationSlice from "../features/conversation/conversationSlice";
import messagesSlice from "../features/messages/messagesSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    conversation: conversationSlice,
    message: messagesSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
