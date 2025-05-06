import { StudentsCollection } from '../db/models/students.js';

export const getAllStudents = async () => {
  const students = await StudentsCollection.find();
  return students;
};

export const getStudentsId = async () => {
  const student = await StudentsCollection.findById(student.Id);
  return student;
};
