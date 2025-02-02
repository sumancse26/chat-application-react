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
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const res = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getConversations",
              undefined,
              (draft) => {
                const existingIndex = draft.conversations.findIndex(
                  (conversation) =>
                    conversation._id === res.data.conversation._id
                );

                if (existingIndex !== -1) {
                  draft.conversations[existingIndex] = res.data.conversation;
                } else {
                  draft.conversations.push(res.data.conversation);
                }
              }
            )
          );

          dispatch(
            apiSlice.util.updateQueryData(
              "getMessages",
              res.data.conversation_id,
              (draftMessage) => {
                if (!Array.isArray(draftMessage.messages)) return;

                draftMessage.messages.push({
                  _id: res.data._id,
                  message: res.data.text,
                  sender: res.data.sender,
                  receiver: res.data.receiver,
                  createdAt: res.data.createdAt,
                  updatedAt: res.data.updatedAt,
                  attachment: res.data.attachment,
                  conversation_id: res.data.conversation_id,
                });
              }
            )
          );
        } catch (e) {
          console.log(e.message);
        }
      },
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
