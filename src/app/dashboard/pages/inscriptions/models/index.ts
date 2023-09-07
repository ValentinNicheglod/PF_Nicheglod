import { Course } from "../../courses/models";
import { Student } from "../../students/models";

export interface Inscription {
  id: number;
  studentId: number;
  courseId: number;
}

export interface InscriptionRequest {
  studentId: number;
  courseId: number;
}

export interface InscriptionData extends Inscription {
  student: Student;
  course: Course;
}

export interface NameData { [key: number]: string }
