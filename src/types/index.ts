export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "teacher" | "student";
  avatar?: string;
  phone?: string;
  departmentId?: string;
}

export interface Teacher extends User {
  role: "teacher";
  employeeId: string;
  designation: string;
  departmentId: string;
  joinDate: string;
  courses?: Course[];
}

export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  departmentId: string;
  semester: string;
  session: string;
  rollNumber: string;
  registrationNumber: string;
  batch: string;
  enrollmentDate: string;
  status: "active" | "inactive" | "graduated";
}

export interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  description?: string;
  totalStudents: number;
  totalTeachers: number;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  departmentId: string;
  teacherId: string;
  semester: string;
  session: string;
  credits: number;
  classSchedule: ClassSchedule[];
  totalClasses: number;
  completedClasses: number;
  enrolledStudents: number;
  description?: string;
}

export interface ClassSchedule {
  id: string;
  courseId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  roomNumber: string;
  building?: string;
}

export interface AttendanceRecord {
  id: string;
  courseId: string;
  studentId: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  markedBy: string;
  markedAt: string;
  remarks?: string;
}

export interface AttendanceSession {
  id: string;
  courseId: string;
  date: string;
  startTime: string;
  endTime: string;
  topic?: string;
  markedBy: string;
  createdAt: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
}

export interface AttendanceSummary {
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  totalClasses: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  percentage: number;
}

export interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalClasses: number;
  averageAttendance: number;
  todayClasses: number;
  pendingAttendance: number;
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  appliedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  remarks?: string;
}

export type AttendanceStatus = "present" | "absent" | "late" | "excused";
export type UserRole = "admin" | "teacher" | "student";
export type StudentStatus = "active" | "inactive" | "graduated";
