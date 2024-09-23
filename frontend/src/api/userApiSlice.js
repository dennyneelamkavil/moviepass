import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  refetchOnMountOrArgChange: 30,
  baseQuery: baseQuery("users"),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, updatedUser }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedUser,
      }),
    }),
    getTheaterOwners: builder.query({
      query: () => "/theaterOwnerlist",
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    verifyUser: builder.mutation({
      query: (id) => ({
        url: `/verify/${id}`,
        method: "PUT",
      }),
    }),
    requestVerification: builder.mutation({
      query: ({ request }) => ({
        url: `/requestverification`,
        method: "POST",
        body: request,
      }),
    }),
    getAllRequests: builder.query({
      query: () => "/requests",
    }),
    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `/requests/${id}`,
        method: "DELETE",
      }),
    }),
    contactUsRequest: builder.mutation({
      query: (data) => ({
        url: "/contactus",
        method: "POST",
        body: data,
      }),
    }),
    getContactRequest: builder.query({
      query: () => "/contactus",
    }),
    deleteContactRequest: builder.mutation({
      query: (id) => ({
        url: `/contactus/${id}`,
        method: "DELETE",
      }),
    }),
    changePasswordRequest: builder.mutation({
      query: (data) => ({
        url: "/changepassword",
        method: "POST",
        body: data,
      }),
    })
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useUpdateUserMutation,
  useGetTheaterOwnersQuery,
  useDeleteUserMutation,
  useVerifyUserMutation,
  useGetUserByIdQuery,
  useRequestVerificationMutation,
  useGetAllRequestsQuery,
  useDeleteRequestMutation,
  useContactUsRequestMutation,
  useGetContactRequestQuery,
  useDeleteContactRequestMutation,
  useChangePasswordRequestMutation
} = userApi;
