import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../auth/authSlice";
import {
  useAddNewShowtimeMutation,
  useUpdateShowtimeMutation,
  useGetShowtimeByIdQuery,
} from "../api/showtimeSlice";
import { useGetAllMoviesQuery } from "../api/movieSlice";
import { toast } from "react-toastify";

export default function ShowtimesForm() {
  const { theaterID, showtimeID: id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditMode = Boolean(id);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const { data, refetch } = useGetShowtimeByIdQuery(id, {
    skip: !isEditMode,
  });

  const { data: moviesData = {} } = useGetAllMoviesQuery();
  const movies = moviesData.movies || [];

  const [updateShowtime, { isLoading: updating }] = useUpdateShowtimeMutation();
  const [addNewShowtime, { isLoading: adding }] = useAddNewShowtimeMutation();

  useEffect(() => {
    if (isEditMode && data?.showtime) {
      const showtime = data.showtime;

      setValue("movieID", showtime.movieID._id || "");
      setValue(
        "date",
        showtime.date ? new Date(showtime.date).toISOString().split("T")[0] : ""
      );
      setValue("time", showtime.time || "");
    }
  }, [data, isEditMode, setValue]);

  const onSubmit = async (formData) => {
    try {
      const { movieID, date, time } = formData;
      const showtimePayload = {
        movieID,
        theaterID,
        date,
        time,
      };

      let res;
      if (isEditMode) {
        res = await updateShowtime({
          id,
          updatedShowtime: showtimePayload,
        }).unwrap();
        refetch();
      } else {
        res = await addNewShowtime(showtimePayload).unwrap();
      }

      navigate(`/dashboard/showtimes/${theaterID}`);
      toast.success(res.message);
    } catch (error) {
      if (error.status === 401) {
        dispatch(setLogout());
        navigate("/login");
      }
      toast.error(error.data.message);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 pt-20 pb-10 max-w-5xl">
      <div className="flex space-x-4">
        <div className="flex-1 bg-white rounded-lg shadow-lg p-4">
          <div className="bg-white p-3 rounded-t-lg">
            <div className="flex justify-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {isEditMode ? "Edit Showtime" : "Add Showtime"}
              </h2>
            </div>
          </div>

          <div className="p-4 rounded-b-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Movie
                  </label>
                  <select
                    {...register("movieID", { required: "Movie is required" })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Select Movie</option>
                    {movies.map((movie) => (
                      <option key={movie._id} value={movie._id}>
                        {movie.title}
                      </option>
                    ))}
                  </select>
                  {errors.movieID && (
                    <p className="text-red-500 text-sm">
                      {errors.movieID.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    min={
                      new Date(new Date().setDate(new Date().getDate() + 1))
                        .toISOString()
                        .split("T")[0]
                    }
                    {...register("date", { required: "Date is required" })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm">
                      {errors.date.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Time
                  </label>
                  <input
                    type="time"
                    {...register("time", { required: "Time is required" })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.time && (
                    <p className="text-red-500 text-sm">
                      {errors.time.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(`/dashboard/showtimes/${theaterID}`)}
                  className="bg-red-500 text-white hover:opacity-90 px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white hover:opacity-90 px-6 py-2 rounded-lg"
                  disabled={updating || adding}
                >
                  {isEditMode
                    ? updating
                      ? "Updating..."
                      : "Update Showtime"
                    : adding
                    ? "Adding..."
                    : "Add Showtime"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
