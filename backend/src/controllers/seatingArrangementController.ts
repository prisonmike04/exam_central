import { RequestHandler } from 'express';
import { Student } from '../models/Student';
import { Teacher } from '../models/Teacher';
import { Room } from '../models/Room';
import { SeatingArrangement } from '../models/SeatingArrangement';

// Generate seating arrangement
export const generateSeating: RequestHandler = async (req, res): Promise<void> => {
  try {
    console.log('Generating seating arrangement...');

    const rooms = await Room.findAll();
    const availableTeachers = await Teacher.findAll();

    if (!rooms.length || !availableTeachers.length) {
      res.status(400).json({ error: 'No rooms or teachers available.' });
      return;
    }

    const students = await Student.findAll({
      attributes: ['id', 'name', 'branch', 'semester'],
      order: [['branch', 'ASC'], ['semester', 'ASC']],
    });

    if (!students.length) {
      res.status(400).json({ error: 'No students found.' });
      return;
    }

    // Clear previous seating arrangements
    await SeatingArrangement.destroy({ where: {} });

    // Group students by branch and semester
    const groupedStudents = students.reduce((acc: Record<string, Student[]>, student) => {
      const key = `${student.branch}-${student.semester}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(student);
      return acc;
    }, {});

    let roomIndex = 0;

    for (const [classKey, group] of Object.entries(groupedStudents)) {
      const currentRoom = rooms[roomIndex % rooms.length];
      const teacher = availableTeachers[roomIndex % availableTeachers.length];

      let seatNumber = 1;

      for (const student of group) {
        await SeatingArrangement.create({
          examId: 1,
          studentId: student.id,
          teacherId: teacher.id,
          roomId: currentRoom.id,
          seatNumber: seatNumber++,
        });
      }

      roomIndex++;
    }

    res.status(200).json({ message: 'Seating arrangement generated successfully.' });
  } catch (error) {
    console.error('Error generating seating:', error);
    res.status(500).json({ error: 'Failed to generate seating.' });
  }
};

// Fetch seating arrangement for a room
export const getSeatingByRoom: RequestHandler<{ roomId: string }> = async (req, res): Promise<void> => {
  try {
    const roomId = parseInt(req.params.roomId, 10);
    console.log('Fetching seating for room:', roomId);

    const seats = await SeatingArrangement.findAll({
      where: { roomId },
      include: [
        { model: Room, attributes: ['id', 'name'] },
        { model: Student, attributes: ['id', 'name', 'branch', 'semester'] },
        { model: Teacher, attributes: ['id', 'name'] },
      ],
      order: [['seatNumber', 'ASC']],
    });

    console.log('Found seats:', JSON.stringify(seats, null, 2));

    const teacherName = seats.length > 0 && seats[0].Teacher ? seats[0].Teacher.name : 'N/A';
    const className = seats.length > 0 && seats[0].Student
      ? `${seats[0].Student.branch} - Semester ${seats[0].Student.semester}`
      : 'Class information not available';

    const seatingData = seats.map((seat) => ({
      seatNumber: seat.seatNumber,
      student: seat.Student
        ? { id: seat.Student.id, name: seat.Student.name }
        : null,
    }));

    res.status(200).json({
      className,
      teacherName,
      seating: seatingData,
    });
  } catch (error) {
    console.error('Error fetching seating:', error);
    res.status(500).json({ error: 'Failed to fetch seating.' });
  }
};

// Update a seating arrangement
export const updateSeat: RequestHandler<{ id: string }> = async (req, res): Promise<void> => {
  try {
    const seatingId = parseInt(req.params.id, 10);
    const { roomId, seatNumber } = req.body;

    const seat = await SeatingArrangement.findByPk(seatingId);
    if (!seat) {
      res.status(404).json({ error: 'Seat record not found.' });
      return;
    }

    if (roomId) {
      const room = await Room.findByPk(roomId);
      if (!room) {
        res.status(400).json({ error: 'Invalid roomId.' });
        return;
      }
    }

    if (roomId !== undefined) seat.roomId = roomId;
    if (seatNumber !== undefined) seat.seatNumber = seatNumber;

    await seat.save();
    res.status(200).json({ message: 'Seat updated successfully.', seat });
  } catch (error) {
    console.error('Error updating seat:', error);
    res.status(500).json({ error: 'Failed to update seat.' });
  }
};
