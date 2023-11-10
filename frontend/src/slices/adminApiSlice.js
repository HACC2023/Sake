import { apiSlice } from "./apiSlice";
const BASE_URL = "/api/users";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    adminLogin: builder.mutation({
      query: data => ({
        url: `${BASE_URL}/auth-admin`,
        method: "POST",
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/logout-admin`,
        method: "POST",
      }),
    }),
  }),
});

export const { useAdminLoginMutation, useAdminLogoutMutation } = adminApiSlice;
