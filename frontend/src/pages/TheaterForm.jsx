import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../auth/authSlice";
import cities from "../assets/cities.json";
import {
  useAddNewTheaterMutation,
  useUpdateTheaterMutation,
  useGetTheaterByIdQuery,
} from "../api/theaterSlice";
import { toast } from "react-toastify";
import SeatingLayoutPreview from "../component/SeatingLayoutPreview";

export default function TheaterForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditMode = Boolean(id);

  const {
    handleSubmit,
    register,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      seatingLayout: [],
    },
  });

  const { data, refetch } = useGetTheaterByIdQuery(id, {
    skip: !isEditMode,
  });

  const [updateTheater] = useUpdateTheaterMutation();
  const [addNewTheater] = useAddNewTheaterMutation();

  const {
    fields: seatingFields,
    append: addSeating,
    remove: removeSeating,
  } = useFieldArray({
    control,
    name: "seatingLayout",
  });

  useEffect(() => {
    if (isEditMode && data?.theater) {
      const theater = data.theater;
      setValue("name", theater.name || "");
      setValue("location", theater.location || "");
    }
  }, [data, isEditMode, setValue]);

  const onSubmit = async (formData) => {
    try {
      const { name, location, seatingLayout } = formData;

      let res;
      if (isEditMode) {
        const theaterPayload = {
          name,
          location,
        };
        res = await updateTheater({
          id,
          updatedTheater: theaterPayload,
        }).unwrap();
        refetch();
      } else {
        const totalRows = seatingLayout.reduce((acc, seatingType) => {
          return acc + seatingType.rows.length;
        }, 0);

        if (totalRows < 5) {
          toast.error("You must have at least 5 rows in the seating layout.");
          return;
        }
        const theaterPayload = {
          name,
          location,
          seatingLayout,
        };
        res = await addNewTheater(theaterPayload).unwrap();
      }

      navigate("/dashboard/theaters");
      toast.success(res.message);
    } catch (error) {
      if (error.status === 401) {
        dispatch(setLogout());
        navigate("/login");
      }
      toast.error(error.data.message);
    }
  };

  const getAllUsedRowNames = () => {
    return seatingFields.flatMap((seatingType) =>
      seatingType.rows.map((row) => row.rowname)
    );
  };

  const findAvailableRowLetter = () => {
    const rowLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const usedLetters = getAllUsedRowNames();
    return rowLetters.find((letter) => !usedLetters.includes(letter));
  };

  const handleAddRow = (seatingIndex) => {
    const availableLetter = findAvailableRowLetter();
    if (availableLetter) {
      seatingFields[seatingIndex].rows.push({
        rowname: availableLetter,
        seats: 10,
      });
      setValue("seatingLayout", seatingFields);
    } else {
      toast.error("Maximum number of rows reached.");
    }
  };

  const handleAddSeatingType = () => {
    const availableLetter = findAvailableRowLetter();
    const existingTypes = seatingFields.map((s) => s.type);
    if (availableLetter) {
      if (existingTypes.length < 2) {
        const newType =
          existingTypes.length === 0
            ? "Premium"
            : existingTypes[0] === "Premium"
            ? "Standard"
            : "Premium";
        if (!existingTypes.includes(newType)) {
          addSeating({
            type: newType,
            price: newType === "Premium" ? 500 : 300,
            rows: [{ rowname: availableLetter, seats: 10 }],
          });
        } else {
          toast.error(`Only one ${newType} seating type is allowed.`);
        }
      } else {
        toast.error("Only Standard and Premium seat types are allowed.");
      }
    } else {
      toast.error("Maximum number of rows reached.");
    }
  };

  const removeRow = (seatingIndex, rowIndex) => {
    seatingFields[seatingIndex].rows.splice(rowIndex, 1);
    setValue("seatingLayout", seatingFields);
  };

  const seatingLayout = watch("seatingLayout");

  return (
    <div
      className={`container mx-auto px-4 md:px-8 pt-20 pb-10 ${
        isEditMode ? "max-w-5xl" : "w-full"
      }`}
    >
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="flex-1 bg-white rounded-lg shadow-lg p-4">
          <div className="bg-white p-3 rounded-t-lg">
            <div className="flex justify-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {isEditMode ? "Edit Theater" : "Add Theater"}
              </h2>
            </div>
          </div>

          <div className="p-4 rounded-b-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <select
                    {...register("location", {
                      required: "Location is required",
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Select Location</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.location && (
                    <p className="text-red-500 text-sm">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>

              {!isEditMode && (
                <div className="mb-4">
                  <h3 className="text-lg font-bold">Seating Layout</h3>
                  <p className="text-blue-400 mb-2">
                    Add minimum 5 rows and minimum 10 seats per row.
                  </p>
                  {seatingFields.map((seatingType, seatingIndex) => (
                    <div
                      key={seatingType.id}
                      className="p-4 border border-gray-300 rounded-md mb-4"
                    >
                      <div className="flex justify-between gap-5 mb-2">
                        <div className="w-full">
                          <label className="block text-sm font-medium">
                            Seat Type
                          </label>
                          <input
                            {...register(
                              `seatingLayout[${seatingIndex}].type`,
                              {
                                required: true,
                              }
                            )}
                            defaultValue={seatingType.type}
                            className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                            readOnly
                          />
                        </div>

                        <div className="w-full">
                          <label className="block text-sm font-medium">
                            Price
                          </label>
                          <input
                            type="number"
                            {...register(
                              `seatingLayout[${seatingIndex}].price`,
                              {
                                required: true,
                              }
                            )}
                            defaultValue={seatingType.price}
                            className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                          />
                          {errors.seatingLayout?.[seatingIndex]?.price && (
                            <p className="text-red-500 text-sm">
                              Price is required
                            </p>
                          )}
                        </div>
                      </div>

                      {seatingType.rows?.map((row, rowIndex) => (
                        <div key={rowIndex} className="mb-2">
                          <label className="block text-sm font-medium">
                            Row Name
                          </label>
                          <input
                            {...register(
                              `seatingLayout[${seatingIndex}].rows[${rowIndex}].rowname`,
                              {
                                required: true,
                              }
                            )}
                            defaultValue={row.rowname}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            readOnly
                          />
                          <label className="block text-sm font-medium mt-2">
                            Seats in Row
                          </label>
                          <input
                            type="number"
                            {...register(
                              `seatingLayout[${seatingIndex}].rows[${rowIndex}].seats`,
                              {
                                required: "Number of seats is required",
                                min: {
                                  value: 10,
                                  message: "Minimum seats required is 10",
                                },
                                max: {
                                  value: 30,
                                  message: "Maximum seats allowed is 30",
                                },
                              }
                            )}
                            defaultValue={row.seats || 10}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                          {errors.seatingLayout &&
                            errors.seatingLayout[seatingIndex]?.rows?.[rowIndex]
                              ?.seats && (
                              <p className="text-red-600">
                                {
                                  errors.seatingLayout[seatingIndex].rows[
                                    rowIndex
                                  ].seats.message
                                }
                              </p>
                            )}
                          <button
                            type="button"
                            className="text-red-500 mt-2"
                            onClick={() => removeRow(seatingIndex, rowIndex)}
                          >
                            Remove Row
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        className="text-blue-500"
                        onClick={() => handleAddRow(seatingIndex)}
                      >
                        Add Row
                      </button>

                      <button
                        type="button"
                        className="text-red-500 ml-4"
                        onClick={() => removeSeating(seatingIndex)}
                      >
                        Remove Seat Type
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddSeatingType}
                    className="bg-blue-500 text-white hover:opacity-90 px-4 py-2 rounded-md"
                  >
                    Add Seat Type
                  </button>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/theaters")}
                  className="bg-red-500 text-white hover:opacity-90 px-6 py-2 rounded-lg flex-shrink-0"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white hover:opacity-90 px-6 py-2 rounded-lg flex-shrink-0"
                >
                  {isEditMode ? "Update Theater" : "Add Theater"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div
          className={`${
            isEditMode ? "hidden" : "block"
          } w-full md:w-1/2 bg-white rounded-lg shadow-lg p-4`}
        >
          <SeatingLayoutPreview seatingLayout={seatingLayout} />
        </div>
      </div>
    </div>
  );
}
