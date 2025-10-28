import {
  AttendanceRecord,
  AttendanceSession,
  Course,
  Department,
  Student,
  Teacher,
  User,
} from "@/types";
import { getCurrentAcademicYear } from "./utils";

// Departments
export const departments: Department[] = [
  {
    id: "dept-1",
    name: "Computer Science & Engineering",
    code: "CSE",
    head: "Md. Mahmudul Hasan",
    description: "Department of Computer Science and Engineering",
    totalStudents: 450,
    totalTeachers: 25,
  },
  {
    id: "dept-2",
    name: "Electrical & Electronic Engineering",
    code: "EEE",
    head: "Dr. Fatima Khan",
    description: "Department of Electrical and Electronic Engineering",
    totalStudents: 380,
    totalTeachers: 22,
  },
  {
    id: "dept-3",
    name: "Business Administration",
    code: "BBA",
    head: "Dr. Mohammad Islam",
    description: "Department of Business Administration",
    totalStudents: 520,
    totalTeachers: 30,
  },
  {
    id: "dept-4",
    name: "English",
    code: "ENG",
    head: "Dr. Sarah Ahmed",
    description: "Department of English",
    totalStudents: 280,
    totalTeachers: 18,
  },
];

// Teachers
export const teachers: Teacher[] = [
  {
    id: "teacher-1",
    email: "teacher@gmail.com",
    name: "Md. Shakil Siddique",
    role: "teacher",
    employeeId: "T001",
    designation: "Assistant Professor",
    departmentId: "dept-1",
    joinDate: "2020-01-15",
    phone: "+880 1712-345678",
    avatar:
      "https://ui-avatars.com/api/?name=John+Smith&background=3b82f6&color=fff",
  },
  {
    id: "teacher-2",
    email: "maria.garcia@example.com",
    name: "Md. Mehedi Alam",
    role: "teacher",
    employeeId: "T002",
    designation: "Assistant Professor",
    departmentId: "dept-1",
    joinDate: "2019-08-20",
    phone: "+880 1712-345679",
    avatar:
      "https://ui-avatars.com/api/?name=Maria+Garcia&background=10b981&color=fff",
  },
  {
    id: "teacher-3",
    email: "rahman.ali@example.com",
    name: "Prof. Rahman Ali",
    role: "teacher",
    employeeId: "T003",
    designation: "Professor",
    departmentId: "dept-1",
    joinDate: "2015-03-10",
    phone: "+880 1712-345680",
    avatar:
      "https://ui-avatars.com/api/?name=Rahman+Ali&background=8b5cf6&color=fff",
  },
  {
    id: "teacher-4",
    email: "lisa.chen@example.com",
    name: "Md. Mahfuzur Rahman",
    role: "teacher",
    employeeId: "T004",
    designation: "Assistant Professor",
    departmentId: "dept-2",
    joinDate: "2020-01-05",
    phone: "+880 1712-345681",
    avatar:
      "https://ui-avatars.com/api/?name=Lisa+Chen&background=f59e0b&color=fff",
  },
];

// Students
export const students: Student[] = [
  {
    id: "student-1",
    studentId: "CSE2101001",
    name: "Rahim Ahmed",
    email: "rahim@student.edu",
    phone: "+880 1812-111111",
    departmentId: "dept-1",
    semester: "6th",
    session: "2020-2021",
    rollNumber: "001",
    registrationNumber: "200001",
    batch: "2020",
    enrollmentDate: "2020-01-10",
    status: "active",
    avatar:
      "https://ui-avatars.com/api/?name=Rahim+Ahmed&background=0ea5e9&color=fff",
  },
  {
    id: "student-2",
    studentId: "CSE2101002",
    name: "Fatima Khan",
    email: "fatima@student.edu",
    phone: "+880 1812-111112",
    departmentId: "dept-1",
    semester: "7th",
    session: "2020-2021",
    rollNumber: "002",
    registrationNumber: "200002",
    batch: "2020",
    enrollmentDate: "2020-01-10",
    status: "active",
    avatar:
      "https://ui-avatars.com/api/?name=Fatima+Khan&background=ec4899&color=fff",
  },
  {
    id: "student-3",
    studentId: "CSE2101003",
    name: "Karim Hassan",
    email: "karim@student.edu",
    phone: "+880 1812-111113",
    departmentId: "dept-1",
    semester: "7th",
    session: "2020-2021",
    rollNumber: "003",
    registrationNumber: "200003",
    batch: "2020",
    enrollmentDate: "2020-01-10",
    status: "active",
    avatar:
      "https://ui-avatars.com/api/?name=Karim+Hassan&background=14b8a6&color=fff",
  },
  {
    id: "student-4",
    studentId: "CSE2101004",
    name: "Ayesha Rahman",
    email: "ayesha@student.edu",
    phone: "+880 1812-111114",
    departmentId: "dept-1",
    semester: "7th",
    session: "2020-2021",
    rollNumber: "004",
    registrationNumber: "200004",
    batch: "2020",
    enrollmentDate: "2020-01-10",
    status: "active",
    avatar:
      "https://ui-avatars.com/api/?name=Ayesha+Rahman&background=f43f5e&color=fff",
  },
  {
    id: "student-5",
    studentId: "CSE2101005",
    name: "Mahmud Islam",
    email: "mahmud@student.edu",
    phone: "+880 1812-111115",
    departmentId: "dept-1",
    semester: "7th",
    session: "2020-2021",
    rollNumber: "005",
    registrationNumber: "200005",
    batch: "2020",
    enrollmentDate: "2020-01-10",
    status: "active",
    avatar:
      "https://ui-avatars.com/api/?name=Mahmud+Islam&background=8b5cf6&color=fff",
  },
  {
    id: "student-6",
    studentId: "CSE2101006",
    name: "Nadia Hossain",
    email: "nadia@student.edu",
    phone: "+880 1812-111116",
    departmentId: "dept-1",
    semester: "7th",
    session: "2020-2021",
    rollNumber: "006",
    registrationNumber: "200006",
    batch: "2020",
    enrollmentDate: "2020-01-10",
    status: "active",
    avatar:
      "https://ui-avatars.com/api/?name=Nadia+Hossain&background=06b6d4&color=fff",
  },
  {
    id: "student-7",
    studentId: "CSE2101007",
    name: "Tariq Abdullah",
    email: "tariq@student.edu",
    phone: "+880 1812-111117",
    departmentId: "dept-1",
    semester: "7th",
    session: "2020-2021",
    rollNumber: "007",
    registrationNumber: "200007",
    batch: "2020",
    enrollmentDate: "2020-01-10",
    status: "active",
    avatar:
      "https://ui-avatars.com/api/?name=Tariq+Abdullah&background=f59e0b&color=fff",
  },
  {
    id: "student-8",
    studentId: "CSE2101008",
    name: "Sabrina Akter",
    email: "sabrina@student.edu",
    phone: "+880 1812-111118",
    departmentId: "dept-1",
    semester: "7th",
    session: "2020-2021",
    rollNumber: "008",
    registrationNumber: "200008",
    batch: "2020",
    enrollmentDate: "2020-01-10",
    status: "active",
    avatar:
      "https://ui-avatars.com/api/?name=Sabrina+Akter&background=84cc16&color=fff",
  },
  {
    id: "student-9",
    studentId: "CSE2201001",
    name: "Faisal Ahmed",
    email: "faisal@student.edu",
    phone: "+880 1812-111119",
    departmentId: "dept-1",
    semester: "5th",
    session: "2020-2021",
    rollNumber: "001",
    registrationNumber: "200001",
    batch: "2020",
    enrollmentDate: "2020-01-10",
    status: "active",
    avatar:
      "https://ui-avatars.com/api/?name=Faisal+Ahmed&background=6366f1&color=fff",
  },
  {
    id: "student-10",
    studentId: "CSE2201002",
    name: "Tahsin Rahman",
    email: "tahsin@student.edu",
    phone: "+880 1812-111120",
    departmentId: "dept-1",
    semester: "5th",
    session: "2020-2021",
    rollNumber: "002",
    registrationNumber: "200002",
    batch: "2020",
    enrollmentDate: "2020-01-10",
    status: "active",
    avatar:
      "https://ui-avatars.com/api/?name=Tahsin+Rahman&background=ef4444&color=fff",
  },
];

// Courses
export const courses: Course[] = [
  {
    id: "course-1",
    code: "CSE401",
    name: "Software Engineering",
    departmentId: "dept-1",
    teacherId: "teacher-1",
    semester: "7th",
    session: getCurrentAcademicYear(),
    credits: 3,
    totalClasses: 40,
    completedClasses: 25,
    enrolledStudents: 8,
    description: "Principles and practices of software engineering",
    classSchedule: [
      {
        id: "schedule-1",
        courseId: "course-1",
        dayOfWeek: "Sunday",
        startTime: "09:00",
        endTime: "10:30",
        roomNumber: "401",
        building: "Academic Building A",
      },
      {
        id: "schedule-2",
        courseId: "course-1",
        dayOfWeek: "Tuesday",
        startTime: "09:00",
        endTime: "10:30",
        roomNumber: "401",
        building: "Academic Building A",
      },
    ],
  },
  {
    id: "course-2",
    code: "CSE402",
    name: "Database Management Systems",
    departmentId: "dept-1",
    teacherId: "teacher-1",
    semester: "7th",
    session: getCurrentAcademicYear(),
    credits: 3,
    totalClasses: 40,
    completedClasses: 22,
    enrolledStudents: 8,
    description: "Design and implementation of database systems",
    classSchedule: [
      {
        id: "schedule-3",
        courseId: "course-2",
        dayOfWeek: "Monday",
        startTime: "11:00",
        endTime: "12:30",
        roomNumber: "305",
        building: "Academic Building A",
      },
      {
        id: "schedule-4",
        courseId: "course-2",
        dayOfWeek: "Wednesday",
        startTime: "11:00",
        endTime: "12:30",
        roomNumber: "305",
        building: "Academic Building A",
      },
    ],
  },
  {
    id: "course-3",
    code: "CSE403",
    name: "Artificial Intelligence",
    departmentId: "dept-1",
    teacherId: "teacher-2",
    semester: "7th",
    session: getCurrentAcademicYear(),
    credits: 3,
    totalClasses: 40,
    completedClasses: 28,
    enrolledStudents: 8,
    description: "Fundamentals of artificial intelligence and machine learning",
    classSchedule: [
      {
        id: "schedule-5",
        courseId: "course-3",
        dayOfWeek: "Sunday",
        startTime: "14:00",
        endTime: "15:30",
        roomNumber: "502",
        building: "Academic Building B",
      },
      {
        id: "schedule-6",
        courseId: "course-3",
        dayOfWeek: "Thursday",
        startTime: "14:00",
        endTime: "15:30",
        roomNumber: "502",
        building: "Academic Building B",
      },
    ],
  },
  {
    id: "course-4",
    code: "CSE404",
    name: "Computer Networks",
    departmentId: "dept-1",
    teacherId: "teacher-3",
    semester: "7th",
    session: getCurrentAcademicYear(),
    credits: 3,
    totalClasses: 40,
    completedClasses: 20,
    enrolledStudents: 8,
    description: "Network protocols, architecture, and security",
    classSchedule: [
      {
        id: "schedule-7",
        courseId: "course-4",
        dayOfWeek: "Monday",
        startTime: "09:00",
        endTime: "10:30",
        roomNumber: "201",
        building: "Academic Building C",
      },
      {
        id: "schedule-8",
        courseId: "course-4",
        dayOfWeek: "Wednesday",
        startTime: "09:00",
        endTime: "10:30",
        roomNumber: "201",
        building: "Academic Building C",
      },
    ],
  },
];

// Generate attendance records for the last 30 days
const generateAttendanceRecords = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const today = new Date();

  // Generate records for each course
  courses.forEach((course) => {
    // Get students enrolled in this course (first 8 students)
    const enrolledStudents = students.slice(0, 8);

    // Generate attendance for the last 25 completed classes
    for (let i = 0; i < course.completedClasses; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i * 2); // Every 2 days

      enrolledStudents.forEach((student) => {
        // 85% present, 5% absent, 7% late, 3% excused
        const rand = Math.random();
        let status: "present" | "absent" | "late" | "excused";
        if (rand < 0.85) status = "present";
        else if (rand < 0.9) status = "absent";
        else if (rand < 0.97) status = "late";
        else status = "excused";

        records.push({
          id: `attendance-${course.id}-${student.id}-${i}`,
          courseId: course.id,
          studentId: student.id,
          date: date.toISOString().split("T")[0],
          status,
          markedBy: course.teacherId,
          markedAt: new Date(date.setHours(10, 0, 0, 0)).toISOString(),
          remarks: status === "late" ? "Arrived 15 minutes late" : undefined,
        });
      });
    }
  });

  return records;
};

export const attendanceRecords: AttendanceRecord[] =
  generateAttendanceRecords();

// Generate attendance sessions
export const attendanceSessions: AttendanceSession[] = courses.flatMap(
  (course) => {
    const sessions: AttendanceSession[] = [];
    const today = new Date();

    for (let i = 0; i < course.completedClasses; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i * 2);

      const sessionRecords = attendanceRecords.filter(
        (r) =>
          r.courseId === course.id &&
          r.date === date.toISOString().split("T")[0]
      );

      sessions.push({
        id: `session-${course.id}-${i}`,
        courseId: course.id,
        date: date.toISOString().split("T")[0],
        startTime: "09:00",
        endTime: "10:30",
        topic: `Lecture ${i + 1}`,
        markedBy: course.teacherId,
        createdAt: new Date(date.setHours(10, 0, 0, 0)).toISOString(),
        totalStudents: course.enrolledStudents,
        presentCount: sessionRecords.filter((r) => r.status === "present")
          .length,
        absentCount: sessionRecords.filter((r) => r.status === "absent").length,
        lateCount: sessionRecords.filter((r) => r.status === "late").length,
        excusedCount: sessionRecords.filter((r) => r.status === "excused")
          .length,
      });
    }

    return sessions;
  }
);

// Default users for authentication
export const defaultUsers: User[] = [
  ...teachers,
  {
    id: "admin-1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    avatar:
      "https://ui-avatars.com/api/?name=Admin+User&background=dc2626&color=fff",
  },
];
