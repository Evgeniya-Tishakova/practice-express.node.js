import { StudentsCollection } from '../db/models/students.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllStudents = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const studentQuery = StudentsCollection.find();

  if (typeof filter.minAge !== 'undefined') {
    studentQuery.where('age').gte(filter.minAge);
  }

  if (typeof filter.maxAge !== 'undefined') {
    studentQuery.where('age').lte(filter.maxAge);
  }

  const [studentsCount, students] = await Promise.all([
    StudentsCollection.countDocuments(studentQuery),
    //   было так StudentsCollection.find()
    studentQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const paginationData = calculatePaginationData(studentsCount, perPage, page);

  return {
    students,
    ...paginationData,
  };
};

export const getStudentById = async (id) => {
  const student = await StudentsCollection.findById(id);
  return student;
};

export const createStudent = async (payload) => {
  const student = await StudentsCollection.create(payload);
  return student;
};

export const deleteStudent = async (studentId) => {
  const student = await StudentsCollection.findOneAndDelete({ _id: studentId });
  return student;
};

export const updateStudent = async (studentId, payload, options = {}) => {
  const rawResult = await StudentsCollection.findOneAndUpdate(
    { _id: studentId },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
