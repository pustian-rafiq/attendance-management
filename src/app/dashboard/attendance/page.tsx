"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { courses, students } from "@/lib/mock-data";
import { getInitials } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { AttendanceStatus } from "@/types";
import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  Clock,
  Save,
  Search,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface StudentAttendance {
  studentId: string;
  studentName: string;
  rollNumber: string;
  avatar?: string;
  status: AttendanceStatus;
}

export default function AttendancePage() {
  const { user } = useAuthStore();
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [attendanceDate, setAttendanceDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [topic, setTopic] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [studentAttendances, setStudentAttendances] = useState<
    StudentAttendance[]
  >([]);
  const [isSaved, setIsSaved] = useState(false);

  // Get teacher's courses
  const teacherCourses =
    user?.role === "teacher"
      ? courses.filter((c) => c.teacherId === user.id)
      : courses;

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
    setIsSaved(false);

    // Get students enrolled in the course (for demo, use first 8 students)
    const enrolledStudents = students.slice(0, 8);

    // Initialize attendance for all students (default: present)
    const initialAttendances: StudentAttendance[] = enrolledStudents.map(
      (student) => ({
        studentId: student.id,
        studentName: student.name,
        rollNumber: student.rollNumber,
        avatar: student.avatar,
        status: "present" as AttendanceStatus,
      })
    );

    setStudentAttendances(initialAttendances);
  };

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setStudentAttendances((prev) =>
      prev.map((s) => (s.studentId === studentId ? { ...s, status } : s))
    );
  };

  const handleSaveAttendance = () => {
    // In a real app, this would send data to an API
    console.log("Saving attendance:", {
      courseId: selectedCourse,
      date: attendanceDate,
      topic,
      attendances: studentAttendances,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const filteredStudents = studentAttendances.filter(
    (student) =>
      student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCourseData = courses.find((c) => c.id === selectedCourse);

  // Calculate statistics
  const presentCount = studentAttendances.filter(
    (s) => s.status === "present"
  ).length;
  const absentCount = studentAttendances.filter(
    (s) => s.status === "absent"
  ).length;
  const lateCount = studentAttendances.filter(
    (s) => s.status === "late"
  ).length;
  const excusedCount = studentAttendances.filter(
    (s) => s.status === "excused"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Take Attendance</h2>
        <p className="text-muted-foreground">
          Mark student attendance for your classes
        </p>
      </div>

      {/* Course Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Select Course</CardTitle>
          <CardDescription className="text-sm">
            Choose the course and date for attendance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Course</Label>
              <Select value={selectedCourse} onValueChange={handleCourseSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {teacherCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.code} - {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
              />
            </div>
          </div>
          {selectedCourse && (
            <div className="space-y-2">
              <Label>Lecture Topic (Optional)</Label>
              <Input
                placeholder="Enter today's lecture topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
          )}
          {selectedCourseData && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-4">
                <ClipboardList className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{selectedCourseData.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedCourseData.code} • Semester:{" "}
                    {selectedCourseData.semester} • Students:{" "}
                    {selectedCourseData.enrolledStudents}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Attendance Marking */}
      {selectedCourse && studentAttendances.length > 0 && (
        <>
          {/* Statistics */}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Present</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {presentCount}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Absent</CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {absentCount}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Late</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {lateCount}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Excused</CardTitle>
                <AlertCircle className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {excusedCount}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Student List */}
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div>
                  <CardTitle className="text-lg sm:text-xl">
                    Student Attendance
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Mark attendance for each student
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 w-full sm:w-64"
                    />
                  </div>
                  <Button
                    onClick={handleSaveAttendance}
                    disabled={isSaved}
                    className="w-full sm:w-auto"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isSaved ? "Saved!" : "Save Attendance"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[180px]">Student</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Roll Number
                    </TableHead>
                    <TableHead className="text-center">Present</TableHead>
                    <TableHead className="text-center">Absent</TableHead>
                    <TableHead className="text-center hidden md:table-cell">
                      Late
                    </TableHead>
                    <TableHead className="text-center hidden md:table-cell">
                      Excused
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.studentId}>
                      <TableCell>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback className="text-xs sm:text-sm">
                              {getInitials(student.studentName)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm sm:text-base">
                              {student.studentName}
                            </span>
                            <span className="text-xs text-muted-foreground sm:hidden">
                              Roll: {student.rollNumber}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {student.rollNumber}
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={student.status === "present"}
                          onCheckedChange={() =>
                            handleStatusChange(student.studentId, "present")
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={student.status === "absent"}
                          onCheckedChange={() =>
                            handleStatusChange(student.studentId, "absent")
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center hidden md:table-cell">
                        <Checkbox
                          checked={student.status === "late"}
                          onCheckedChange={() =>
                            handleStatusChange(student.studentId, "late")
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center hidden md:table-cell">
                        <Checkbox
                          checked={student.status === "excused"}
                          onCheckedChange={() =>
                            handleStatusChange(student.studentId, "excused")
                          }
                        />
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge
                          variant={
                            student.status === "present"
                              ? "success"
                              : student.status === "absent"
                              ? "destructive"
                              : student.status === "late"
                              ? "warning"
                              : "info"
                          }
                          className="text-xs"
                        >
                          {student.status.charAt(0).toUpperCase() +
                            student.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

      {!selectedCourse && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ClipboardList className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No Course Selected</p>
            <p className="text-muted-foreground">
              Please select a course to start taking attendance
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
