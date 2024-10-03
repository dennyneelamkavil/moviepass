import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../auth/authSlice";
import {
  useAddNewMovieMutation,
  useUpdateMovieMutation,
  useGetMovieByIdQuery,
} from "../api/movieSlice";
import { toast } from "react-toastify";
export default function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditMode = Boolean(id);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const { data, refetch } = useGetMovieByIdQuery(id, {
    skip: !isEditMode,
  });

  const [updateMovie, { isLoading: updating }] = useUpdateMovieMutation();
  const [addNewMovie, { isLoading: adding }] = useAddNewMovieMutation();

  useEffect(() => {
    if (isEditMode && data?.movie) {
      const movie = data.movie;
      setValue("title", movie.title || "");
      setValue("year", movie.year || "");
      setValue("description", movie.description || "");
      setValue("genre", movie.genre.join(", ") || "");
      setValue("director", movie.director.join(", ") || "");
      setValue("writers", movie.writers.join(", ") || "");
      setValue("stars", movie.stars.join(", ") || "");
      setValue("duration", movie.duration || "");
      setValue("trailerUrl", movie.trailerUrl || "");
      setImagePreview(movie.image || null);
    }
  }, [data, isEditMode, setValue]);

  const onSubmit = async (formData) => {
    try {
      const {
        title,
        year,
        description,
        genre,
        director,
        writers,
        stars,
        duration,
        trailerUrl,
        image,
      } = formData;
      const moviePayload = new FormData();
      moviePayload.append("title", title);
      moviePayload.append("year", Number(year));
      moviePayload.append("description", description);
      moviePayload.append(
        "genre",
        genre.split(",").map((g) => g.trim())
      );
      moviePayload.append(
        "director",
        director.split(",").map((d) => d.trim())
      );
      moviePayload.append(
        "writers",
        writers.split(",").map((w) => w.trim())
      );
      moviePayload.append(
        "stars",
        stars.split(",").map((s) => s.trim())
      );
      moviePayload.append("duration", Number(duration));
      moviePayload.append("trailerUrl", trailerUrl);
      if (image[0]) {
        moviePayload.append("poster", image[0]);
      }

      let res;
      if (isEditMode) {
        res = await updateMovie({
          id,
          updatedMovie: moviePayload,
        }).unwrap();
        refetch();
      } else {
        res = await addNewMovie(moviePayload).unwrap();
      }

      navigate("/dashboard/movies");
      toast.success(res.message);
    } catch (error) {
      if (error.status === 401) {
        dispatch(setLogout());
        navigate("/login");
      }
      toast.error(error.data.message);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 pt-20 pb-10 max-w-5xl">
      <div className="flex space-x-4">
        <div className="flex-1 bg-white rounded-lg shadow-lg p-4">
          <div className="bg-white p-3 rounded-t-lg">
            <div className="flex justify-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {isEditMode ? "Edit Movie" : "Add Movie"}
              </h2>
            </div>
          </div>

          <div className="p-4 rounded-b-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Year Released
                  </label>
                  <input
                    type="text"
                    {...register("year", {
                      required: "Year is required",
                      validate: (value) =>
                        (!isNaN(value) && Number(value) > 0) ||
                        "Year must be a positive number",
                    })}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.year && (
                    <p className="text-red-500 text-sm">
                      {errors.year.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                    rows="4"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Genre
                    <span className="text-xs text-gray-500">
                      (comma separated)
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("genre", { required: "Genre is required" })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.genre && (
                    <p className="text-red-500 text-sm">
                      {errors.genre.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Director
                  </label>
                  <input
                    type="text"
                    {...register("director", {
                      required: "Director is required",
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.director && (
                    <p className="text-red-500 text-sm">
                      {errors.director.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Writers
                  </label>
                  <input
                    type="text"
                    {...register("writers", {
                      required: "Writers is required",
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.writers && (
                    <p className="text-red-500 text-sm">
                      {errors.writers.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Stars
                    <span className="text-xs text-gray-500">
                      (comma separated)
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("stars", {
                      required: "Stars is required",
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.stars && (
                    <p className="text-red-500 text-sm">
                      {errors.stars.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Duration (in minutes)
                  </label>
                  <input
                    type="text"
                    {...register("duration", {
                      required: "Duration is required",
                      validate: (value) =>
                        (!isNaN(value) && Number(value) > 0) ||
                        "Duration must be a positive number",
                    })}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
                    className="w-full border border-gray-300 rounded-md p-2 appearance-none"
                  />
                  {errors.duration && (
                    <p className="text-red-500 text-sm">
                      {errors.duration.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Trailer Link (Only provide the Video ID)
                  </label>
                  <input
                    type="text"
                    {...register("trailerUrl", {
                      required: "Trailer link is required",
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  <span className="text-xs text-gray-500">
                    (e.g. https://www.youtube.com/watch?v=
                    <span className="font-semibold">123456789</span>
                    <br />
                    Here <span className="font-semibold">123456789</span> is the
                    video ID)
                  </span>
                  {errors.trailerUrl && (
                    <p className="text-red-500 text-sm">
                      {errors.trailerUrl.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <input
                    type="file"
                    {...register("image", {
                      required: !isEditMode && "Image is required",
                    })}
                    className="w-full border border-gray-300 rounded-md p-2 cursor-pointer"
                    onChange={handleImageChange}
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm">
                      {errors.image.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Preview
                  </label>
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-24 h-16 object-cover border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-sm text-gray-500">No file selected</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/movies")}
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
                      ? "Updating Movie..."
                      : "Update Movie"
                    : adding
                    ? "Adding Movie..."
                    : "Add Movie"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
