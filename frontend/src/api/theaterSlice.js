import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const theaterApi = createApi({
  reducerPath: "theaterApi",
  refetchOnMountOrArgChange: 30,
  baseQuery: baseQuery("theaters"),
  endpoints: (builder) => ({
    addNewTheater: builder.mutation({
      query: (newTheater) => ({
        url: "/addnew",
        method: "POST",
        body: newTheater,
      }),
    }),
    updateTheater: builder.mutation({
      query: ({ id, updatedTheater }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedTheater,
      }),
    }),
    getAllTheaters: builder.query({
      query: () => "/all",
    }),
    getTheaterById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    getTheaterByOwner: builder.query({
      query: (id) => ({
        url: `/theaterOwner/${id}`,
        method: "GET",
      }),
    }),
    deleteTheater: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddNewTheaterMutation,
  useUpdateTheaterMutation,
  useGetTheaterByIdQuery,
  useGetAllTheatersQuery,
  useDeleteTheaterMutation,
  useGetTheaterByOwnerQuery,
} = theaterApi;
