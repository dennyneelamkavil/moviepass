import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const showtimeApi = createApi({
  reducerPath: "showtimeApi",
  refetchOnMountOrArgChange: 30,
  baseQuery: baseQuery("showtimes"),
  endpoints: (builder) => ({
    addNewShowtime: builder.mutation({
      query: (newShowtime) => ({
        url: "/addnew",
        method: "POST",
        body: newShowtime,
      }),
    }),
    updateShowtime: builder.mutation({
      query: ({ id, updatedShowtime }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedShowtime,
      }),
    }),
    getShowtimeByTheater: builder.query({
      query: (theaterID) => ({
        url: `/theater/${theaterID}`,
        method: "GET",
      }),
    }),
    getAllShowtimes: builder.query({
      query: () => "/all",
    }),
    getShowtimeById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    deleteShowtime: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddNewShowtimeMutation,
  useUpdateShowtimeMutation,
  useGetAllShowtimesQuery,
  useGetShowtimeByIdQuery,
  useDeleteShowtimeMutation,
  useGetShowtimeByTheaterQuery,
} = showtimeApi;
