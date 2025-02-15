import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    register: builder.mutation({
      query: (formData) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: formData, // Ensure that formData is passed correctly
      }),
    }),

    updateUser: builder.mutation({
      query: (formData) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: formData, // Ensure that formData is passed correctly
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation } = usersApiSlice;