import { apiSlice } from "../../api/apiSlice";
import { messagesApi } from "../messages/messagesApi";

export const conversationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => `/api/inbox`,
    }),
    getConversation: builder.query({
      query: () => `/api/inbox`,
    }),
    addConversation: builder.mutation({
      query: ({ sender, data }) => ({
        url: "/conversations",
        method: "POST",
        body: data,
      }),

      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const conversation = await queryFulfilled;
        if (conversation?.data.id) {
          const users = arg.data.users;
          const senderUser = users.find((user) => user.email === arg.sender);
          const receiverUser = users.find((user) => user.email !== arg.sender);
          dispatch(
            messagesApi.endpoints.addMessage.initiate({
              conversationId: conversation.data.id,
              sender: senderUser,
              receiver: receiverUser,
              message: arg.data.message,
              timestamp: arg.data.timestamp,
            })
          );
        }
      },
    }),
    editConversation: builder.mutation({
      query: ({ id, data, sender }) => {
        return {
          url: `/conversations/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const patchRes = dispatch(
          apiSlice.util.updateQueryData(
            "getConversations",
            arg.sender,
            (draft) => {
              const draftConversation = draft.find((c) => c.id === arg.id);
              draftConversation.message = arg.data.message;
              draftConversation.timestamp = arg.data.timestamp;
            }
          )
        );
        const conversation = await queryFulfilled;
        try {
          if (conversation?.data.id) {
            const users = arg.data.users;
            const senderUser = users.find((user) => user.email === arg.sender);
            const receiverUser = users.find(
              (user) => user.email !== arg.sender
            );
            const res = await dispatch(
              messagesApi.endpoints.addMessage.initiate({
                conversationId: conversation.data.id,
                sender: senderUser,
                receiver: receiverUser,
                message: arg.data.message,
                timestamp: arg.data.timestamp,
              })
            ).unwrap();

            dispatch(
              apiSlice.util.updateQueryData(
                "getMessages",
                res.conversationId.toString(),
                (draft) => {
                  draft.push(res);
                }
              )
            );
          }
        } catch (e) {
          patchRes.undo();
          console.log(e.message);
        }
      },
    }),

    addConversationWithMessage: builder.mutation({
      query: (data) => ({
        url: "/api/add-message-with-conversation",
        method: "POST",
        body: data,
      }),

      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const res = await queryFulfilled;

        dispatch(
          apiSlice.util.updateQueryData(
            "getConversations",
            undefined,
            (draft) => {
              const existingIndex = draft.conversations.findIndex(
                (conversation) => conversation._id === res.data.conversation._id
              );

              if (existingIndex !== -1) {
                draft.conversations[existingIndex] = res.data.conversation;
              } else {
                draft.conversations.push(res.data.conversation);
              }
            }
          )
        );
      },
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useAddConversationMutation,
  useEditConversationMutation,
  useAddConversationWithMessageMutation,
} = conversationApi;
