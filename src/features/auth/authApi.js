import { apiSlice } from "../../api/apiSlice";
import { userLogin } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/api/register",
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
              accessToken: res.data.token,
            })
          );

          dispatch(
            userLogin({
              user: res.data.user,
              accessToken: res.data.token,
            })
          );
        } catch (e) {
          console.log(e.message);
        }
      },
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/api/login",
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
              accessToken: res.data.token,
            })
          );

          dispatch(
            userLogin({
              user: res.data.user,
              accessToken: res.data.token,
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
