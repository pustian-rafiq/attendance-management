"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { attendanceRecords, courses, students } from "@/lib/mock-data";
import {
  calculateAttendancePercentage,
  exportToCSV,
  getAttendanceStatus,
} from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { AttendanceSummary } from "@/types";
import { Calendar, Download, FileText, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

export default function ReportsPage() {
  const { user } = useAuthStore();
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");

  // Get teacher's courses
  const teacherCourses =
    user?.role === "teacher"
      ? courses.filter((c) => c.teacherId === user.id)
      : courses;

  // Generate attendance summary
  const generateAttendanceSummary = (): AttendanceSummary[] => {
    const summary: AttendanceSummary[] = [];

    const coursesToAnalyze =
      selectedCourse === "all"
        ? teacherCourses
        : teacherCourses.filter((c) => c.id === selectedCourse);

    coursesToAnalyze.forEach((course) => {
      // Get students enrolled in course (first 8 for demo)
      const enrolledStudents = students.slice(0, 8);

      enrolledStudents.forEach((student) => {
        const studentRecords = attendanceRecords.filter(
          (r) => r.courseId === course.id && r.studentId === student.id
        );

        const present = studentRecords.filter(
          (r) => r.status === "present"
        ).length;
        const absent = studentRecords.filter(
          (r) => r.status === "absent"
        ).length;
        const late = studentRecords.filter((r) => r.status === "late").length;
        const excused = studentRecords.filter(
          (r) => r.status === "excused"
        ).length;
        const total = studentRecords.length;

        summary.push({
          studentId: student.id,
          studentName: student.name,
          courseId: course.id,
          courseName: course.name,
          totalClasses: total,
          present,
          absent,
          late,
          excused,
          percentage: calculateAttendancePercentage(present, total),
        });
      });
    });

    return summary;
  };

  const attendanceSummary = generateAttendanceSummary();

  // Calculate course-wise statistics
  const courseStats = teacherCourses.map((course) => {
    const courseRecords = attendanceRecords.filter(
      (r) => r.courseId === course.id
    );
    const present = courseRecords.filter((r) => r.status === "present").length;
    const total = courseRecords.length;
    const percentage = calculateAttendancePercentage(present, total);

    return {
      courseId: course.id,
      courseName: course.name,
      courseCode: course.code,
      totalStudents: course.enrolledStudents,
      totalClasses: course.completedClasses,
      averageAttendance: percentage,
    };
  });

  // Export functions
  const handleExportAttendanceSummary = () => {
    const exportData = attendanceSummary.map((record) => ({
      "Student Name": record.studentName,
      Course: record.courseName,
      "Total Classes": record.totalClasses,
      Present: record.present,
      Absent: record.absent,
      Late: record.late,
      Excused: record.excused,
      Percentage: `${record.percentage}%`,
    }));
    exportToCSV(exportData, `attendance-summary-${new Date().toISOString()}`);
  };

  const handleExportCourseStats = () => {
    const exportData = courseStats.map((stat) => ({
      "Course Code": stat.courseCode,
      "Course Name": stat.courseName,
      "Total Students": stat.totalStudents,
      "Total Classes": stat.totalClasses,
      "Average Attendance": `${stat.averageAttendance}%`,
    }));
    exportToCSV(exportData, `course-statistics-${new Date().toISOString()}`);
  };

  // Calculate overall statistics
  const totalRecords = attendanceRecords.filter((r) =>
    teacherCourses.some((c) => c.id === r.courseId)
  ).length;
  const totalPresent = attendanceRecords.filter(
    (r) =>
      teacherCourses.some((c) => c.id === r.courseId) && r.status === "present"
  ).length;
  const totalAbsent = attendanceRecords.filter(
    (r) =>
      teacherCourses.some((c) => c.id === r.courseId) && r.status === "absent"
  ).length;
  const overallPercentage = calculateAttendancePercentage(
    totalPresent,
    totalRecords
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Reports & Analytics
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          View attendance reports and analytics for your courses
        </p>
      </div>

      {/* Overall Statistics */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Attendance
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              {totalPresent} present out of {totalRecords}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Present</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalPresent}
            </div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Absent</CardTitle>
            <Users className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalAbsent}</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teacherCourses.reduce((sum, c) => sum + c.completedClasses, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Completed this semester
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            Filter reports by course and time period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {teacherCourses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.code} - {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger>
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="current">Current Month</SelectItem>
                <SelectItem value="last">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Reports */}
      <Tabs defaultValue="student" className="space-y-4">
        <TabsList>
          <TabsTrigger value="student">Student Attendance</TabsTrigger>
          <TabsTrigger value="course">Course Statistics</TabsTrigger>
        </TabsList>

        {/* Student Attendance Report */}
        <TabsContent value="student" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div>
                  <CardTitle className="text-lg sm:text-xl">
                    Student Attendance Report
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Detailed attendance records for all students
                  </CardDescription>
                </div>
                <Button
                  onClick={handleExportAttendanceSummary}
                  className="w-full sm:w-auto"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">
                      Student Name
                    </TableHead>
                    <TableHead className="hidden md:table-cell min-w-[180px]">
                      Course
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Total Classes
                    </TableHead>
                    <TableHead className="text-center">Present</TableHead>
                    <TableHead className="text-center">Absent</TableHead>
                    <TableHead className="text-center hidden lg:table-cell">
                      Late
                    </TableHead>
                    <TableHead className="text-center hidden lg:table-cell">
                      Excused
                    </TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceSummary.map((record, index) => {
                    const status = getAttendanceStatus(record.percentage);
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-sm sm:text-base">
                          <div className="flex flex-col">
                            <span>{record.studentName}</span>
                            <span className="text-xs text-muted-foreground md:hidden">
                              {record.courseName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm">
                          {record.courseName}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-sm">
                          {record.totalClasses}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="success" className="text-xs">
                            {record.present}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="destructive" className="text-xs">
                            {record.absent}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center hidden lg:table-cell">
                          <Badge variant="warning" className="text-xs">
                            {record.late}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center hidden lg:table-cell">
                          <Badge variant="info" className="text-xs">
                            {record.excused}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`${status.color} text-sm font-medium`}
                          >
                            {record.percentage}%
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            variant={
                              record.percentage >= 75 ? "success" : "warning"
                            }
                            className="text-xs"
                          >
                            {status.label}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {attendanceSummary.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">No data available</p>
                  <p className="text-muted-foreground">
                    Select a course to view attendance reports
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Course Statistics Report */}
        <TabsContent value="course" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div>
                  <CardTitle className="text-lg sm:text-xl">
                    Course Statistics
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Attendance statistics for each course
                  </CardDescription>
                </div>
                <Button
                  onClick={handleExportCourseStats}
                  className="w-full sm:w-auto"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {courseStats.map((stat) => {
                  const status = getAttendanceStatus(stat.averageAttendance);
                  return (
                    <div
                      key={stat.courseId}
                      className="p-4 border rounded-lg space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base truncate">
                            {stat.courseName}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {stat.courseCode}
                          </p>
                        </div>
                        <Badge
                          variant={
                            stat.averageAttendance >= 75 ? "success" : "warning"
                          }
                          className="text-xs w-fit"
                        >
                          {status.label}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-sm">
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Students
                          </p>
                          <p className="font-medium text-base sm:text-lg">
                            {stat.totalStudents}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Classes
                          </p>
                          <p className="font-medium text-base sm:text-lg">
                            {stat.totalClasses}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Avg Attendance
                          </p>
                          <p
                            className={`font-medium text-base sm:text-lg ${status.color}`}
                          >
                            {stat.averageAttendance}%
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="w-full bg-muted rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all ${
                              stat.averageAttendance >= 75
                                ? "bg-green-500"
                                : stat.averageAttendance >= 60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${stat.averageAttendance}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
