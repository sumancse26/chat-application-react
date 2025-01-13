import { apiSlice } from "../../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (id) => `/api/message/${id}`,
    }),
    addMessage: builder.mutation({
      query: (data) => ({
        url: "/api/message",
        method: "POST",
        body: data,
      }),
    }),
    addMessageWithConversation: builder.mutation({
      query: (data) => ({
        url: "/api/add-message-with-conversation",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  addMessageWithConversationMutation,
} = messagesApi;
