import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const movieApi = createApi({
  reducerPath: "movieApi",
  refetchOnMountOrArgChange: 30,
  baseQuery: baseQuery("movies"),
  endpoints: (builder) => ({
    addNewMovie: builder.mutation({
      query: (newMovie) => ({
        url: "/addnew",
        method: "POST",
        body: newMovie,
      }),
    }),
    updateMovie: builder.mutation({
      query: ({ id, updatedMovie }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedMovie,
      }),
    }),
    getAllMovies: builder.query({
      query: () => "/all",
    }),
    getMovieById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    getlatestmovies: builder.query({
      query: () => ({
        url: "/getlatestmovies",
        method: "GET",
      }),
    }),
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddNewMovieMutation,
  useUpdateMovieMutation,
  useGetMovieByIdQuery,
  useGetAllMoviesQuery,
  useGetlatestmoviesQuery,
  useDeleteMovieMutation,
} = movieApi;
