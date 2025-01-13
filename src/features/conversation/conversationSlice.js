import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversationInfo: {},
  },
  reducers: {
    setConversationInfo: (state, action) => {
      state.conversationInfo = action.payload;
    },
  },
});

export const { setConversationInfo } = conversationSlice.actions;
export default conversationSlice.reducer;
