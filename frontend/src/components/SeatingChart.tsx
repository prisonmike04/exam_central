interface Seat {
  student: {
    name: string;
  };
  room: {
    name: string;
  };
}

export default function SeatingChart({ arrangement }: { arrangement: Seat[] }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {arrangement.map((seat, index) => (
        <div key={index} className="p-4 bg-gray-200 rounded-md shadow-sm">
          <p>Student: {seat.student.name}</p>
          <p>Room: {seat.room.name}</p>
        </div>
      ))}
    </div>
  );
}
