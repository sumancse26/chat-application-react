import { apiSlice } from "../../api/apiSlice";
import { userLogin } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              user: res.data.user,
              accessToken: res.data.accessToken,
            })
          );

          dispatch(
            userLogin({
              user: res.data.user,
              accessToken: res.data.accessToken,
            })
          );
        } catch (e) {
          console.log(e.message);
        }
      },
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              user: res.data.user,
              accessToken: res.data.accessToken,
            })
          );

          dispatch(
            userLogin({
              user: res.data.user,
              accessToken: res.data.accessToken,
            })
          );
        } catch (e) {
          console.log(e.message);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = apiSlice;
