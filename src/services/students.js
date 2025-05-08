import { StudentsCollection } from '../db/models/students.js';

export const getAllStudents = async () => {
  const students = await StudentsCollection.find();
  return students;
};

export const getStudentById = async (id) => {
  const student = await StudentsCollection.findById(id);
  return student;
};
