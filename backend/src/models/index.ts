// backend/src/models/index.ts
import { Exam } from './Exam';
import { Room } from './Room';
import { Student } from './Student';
import { Teacher } from './Teacher';
import { SeatingArrangement } from './SeatingArrangement';
import { TeacherAvailability } from './TeacherAvailability';

// Define all associations
export const initializeAssociations = () => {
  // Seating Arrangement associations
  SeatingArrangement.belongsTo(Exam, { foreignKey: 'examId' });
  SeatingArrangement.belongsTo(Student, { foreignKey: 'studentId' });
  SeatingArrangement.belongsTo(Teacher, { foreignKey: 'teacherId' });
  SeatingArrangement.belongsTo(Room, { foreignKey: 'roomId' });

  // Reverse associations
  Room.hasMany(SeatingArrangement, { foreignKey: 'roomId' });
  Student.hasMany(SeatingArrangement, { foreignKey: 'studentId' });
  Teacher.hasMany(SeatingArrangement, { foreignKey: 'teacherId' });
  Exam.hasMany(SeatingArrangement, { foreignKey: 'examId' });

  // Teacher Availability associations
  TeacherAvailability.belongsTo(Teacher, { foreignKey: 'teacherId' });
  Teacher.hasMany(TeacherAvailability, { foreignKey: 'teacherId' });
};

export {
  Exam,
  Room,
  Student,
  Teacher,
  SeatingArrangement,
  TeacherAvailability,
};
