import TheaterModel from "../models/theaterModel.js";
import SeatModel from "../models/seatModel.js";

export async function addNewTheater(req, res) {
  const { name, location, seatingLayout, showtimes } = req.body;
  const createdBy = req.user.id;

  const theater = new TheaterModel({
    name,
    location,
    showtimes,
    createdBy,
  });
  await theater.save();

  const seatPromises = [];
  for (const seatData of seatingLayout) {
    for (const row of seatData.rows) {
      for (let seatIndex = 1; seatIndex <= row.seats; seatIndex++) {
        const uniqueSeatId = `${row.rowname}-${seatIndex}`;

        const existingSeat = await SeatModel.findOne({
          theaterID: theater._id,
          seatID: uniqueSeatId,
        });

        if (!existingSeat) {
          seatPromises.push(
            SeatModel.create({
              theaterID: theater._id,
              seatID: uniqueSeatId,
              seatType: seatData.type,
              isAvailable: true,
              price: seatData.price,
            })
          );
        }
      }
    }
  }

  const seats = await Promise.all(seatPromises);
  theater.seatingLayout = seats.map((seat) => seat._id);
  await theater.save();
  res.status(201).json({ message: "Theater created successfully" });
}

export async function getAllTheaters(req, res) {
  const theaters = await TheaterModel.find().populate("showtimes");
  res.status(200).json({ theaters: theaters });
}

export async function getTheaterById(req, res) {
  const { id } = req.params;
  const theater = await TheaterModel.findById(id)
    .populate("showtimes")
    .populate("seatingLayout");
  if (!theater) {
    return res.status(404).json({ message: "Theater not found" });
  }
  res.status(200).json({ theater: theater });
}

export async function getTheaterByOwner(req, res) {
  const { id } = req.params;
  const theaters = await TheaterModel.find({ createdBy: id }).populate(
    "showtimes"
  );
  res.status(200).json({ theaters: theaters });
}

export async function updateTheater(req, res) {
  const { id } = req.params;
  const { name, location } = req.body;
  const newData = { name, location };
  const theater = await TheaterModel.findOneAndUpdate({ _id: id }, newData);
  if (!theater) {
    return res.status(404).json({ message: "Theater not found" });
  }
  res.status(200).json({ message: "Theater updated successfully" });
}

export async function deleteTheater(req, res) {
  const { id } = req.params;
  const theater = await TheaterModel.findByIdAndDelete(id);
  if (!theater) {
    return res.status(404).json({ message: "Theater not found" });
  }
  res.status(200).json({ message: "Theater deleted successfully" });
}
