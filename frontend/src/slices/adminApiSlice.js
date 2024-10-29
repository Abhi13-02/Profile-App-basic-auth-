import { getAllUsers } from "../../../backend/controllers/adminControllers";
import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/admin";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}/allUsers`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/deleteUser/${userId}`, // Adjust the endpoint as necessary
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetAllUsersQuery, useDeleteUserMutation } = usersApiSlice;
