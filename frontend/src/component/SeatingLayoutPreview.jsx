export default function SeatingLayoutPreview({ seatingLayout }) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <h3 className="text-xl font-semibold text-center mx-5">
        Seating Layout Preview
      </h3>
      <p className="text-gray-500 text-center">
        Please try to add the rows in order, from top to bottom. It will be
        displayed in the order you add them. Thank you.
      </p>

      {seatingLayout.map((seatType) => (
        <div key={seatType.id}>
          <h4 className="text-lg font-bold uppercase">{seatType.type} Seats</h4>
          {seatType.rows.map((row) => (
            <div key={row.rowname}>
              <h5 className="font-medium">{`Row ${row.rowname}`}</h5>
              <div className="flex flex-wrap justify-center gap-2 text-center">
                {Array.from({ length: row.seats }, (_, index) => {
                  const seatID = `${row.rowname}-${index + 1}`;
                  return (
                    <div
                      key={seatID}
                      className={`p-2 border rounded bg-transparent border-green-500 text-green-500 w-[60px]`}
                    >
                      {seatID} <br />
                      <span className="text-xs">(₹{seatType.price})</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Screen indicator */}
      <div className="text-center mt-6">
        <div className="border-b-2 border-gray-500 w-1/3 mx-auto">
          <h5 className="text-sm font-semibold">All eyes this way please!</h5>
        </div>
      </div>

      {/* Seat legend */}
      <div className="flex justify-start gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 border"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-transparent border-green-500 border"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-300 border"></div>
          <span>Sold</span>
        </div>
      </div>
    </div>
  );
}
