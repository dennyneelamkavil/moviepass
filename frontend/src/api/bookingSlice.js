import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  refetchOnMountOrArgChange: 30,
  baseQuery: baseQuery("bookings"),
  endpoints: (builder) => ({
    makePayment: builder.mutation({
      query: (data) => ({
        url: "/payment/create-checkout-session",
        method: "POST",
        body: data,
      }),
    }),
    checkStatus: builder.mutation({
      query: (id) => ({
        url: `/payment/status/${id}`,
        method: "GET",
      }),
    }),
    getAllBookings: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
    }),
    getBookingById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    getBookingsByUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
    updateBooking: builder.mutation({
      query: ({ id, updatedBooking }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedBooking,
      }),
    }),
  }),
});

export const {
  useMakePaymentMutation,
  useCheckStatusMutation,
  useGetAllBookingsQuery,
  useGetBookingByIdQuery,
  useGetBookingsByUserQuery,
  useUpdateBookingMutation,
} = bookingApi;
