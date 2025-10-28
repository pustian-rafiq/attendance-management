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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  attendanceRecords,
  courses,
  departments,
  students,
  teachers,
} from "@/lib/mock-data";
import { calculateAttendancePercentage, getInitials } from "@/lib/utils";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const course = courses.find((c) => c.id === resolvedParams.id);

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The course you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const department = departments.find((d) => d.id === course.departmentId);
  const teacher = teachers.find((t) => t.id === course.teacherId);
  const enrolledStudents = students.slice(0, 8); // Demo: first 8 students

  // Calculate attendance for each student
  const studentAttendance = enrolledStudents.map((student) => {
    const studentRecords = attendanceRecords.filter(
      (r) => r.courseId === course.id && r.studentId === student.id
    );
    const present = studentRecords.filter((r) => r.status === "present").length;
    const absent = studentRecords.filter((r) => r.status === "absent").length;
    const late = studentRecords.filter((r) => r.status === "late").length;
    const percentage = calculateAttendancePercentage(
      present,
      studentRecords.length
    );

    return {
      ...student,
      totalClasses: studentRecords.length,
      present,
      absent,
      late,
      percentage,
    };
  });

  const progress = Math.round(
    (course.completedClasses / course.totalClasses) * 100
  );

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Courses
      </Button>

      {/* Course Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-base">
                  {course.code}
                </Badge>
                <Badge>{course.semester}</Badge>
              </div>
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl">
                {course.name}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {department?.name} • {course.credits} Credits
              </CardDescription>
            </div>
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Students</span>
              </div>
              <p className="text-2xl font-bold">{course.enrolledStudents}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Completed Classes
                </span>
              </div>
              <p className="text-2xl font-bold">
                {course.completedClasses}/{course.totalClasses}
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Progress</span>
              </div>
              <p className="text-2xl font-bold">{progress}%</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Session</span>
              </div>
              <p className="text-2xl font-bold">{course.session}</p>
            </div>
          </div>

          {course.description && (
            <div>
              <h3 className="font-semibold mb-2">Course Description</h3>
              <p className="text-muted-foreground">{course.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Instructor Information */}
        <Card>
          <CardHeader>
            <CardTitle>Instructor</CardTitle>
            <CardDescription>Course instructor details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={teacher?.avatar} />
                <AvatarFallback>
                  {teacher?.name ? getInitials(teacher.name) : "T"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="font-semibold text-lg">{teacher?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {teacher && "designation" in teacher
                    ? (teacher as { designation: string }).designation
                    : ""}
                </p>
                <p className="text-sm text-muted-foreground">
                  {teacher?.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Class Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Class Schedule</CardTitle>
            <CardDescription>Regular class timings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {course.classSchedule.map((schedule) => (
              <div
                key={schedule.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{schedule.dayOfWeek}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>
                      Room {schedule.roomNumber}
                      {schedule.building && `, ${schedule.building}`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {schedule.startTime} - {schedule.endTime}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Student Attendance */}
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <CardTitle className="text-lg sm:text-xl">
                Student Attendance
              </CardTitle>
              <CardDescription className="text-sm">
                Attendance records for enrolled students
              </CardDescription>
            </div>
            <Link href="/dashboard/attendance" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">Take Attendance</Button>
            </Link>
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
                <TableHead className="hidden md:table-cell">
                  Total Classes
                </TableHead>
                <TableHead className="text-center">Present</TableHead>
                <TableHead className="text-center">Absent</TableHead>
                <TableHead className="text-center hidden lg:table-cell">
                  Late
                </TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentAttendance.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback className="text-xs sm:text-sm">
                          {getInitials(student.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium text-sm sm:text-base truncate">
                          {student.name}
                        </span>
                        <span className="text-xs text-muted-foreground sm:hidden">
                          Roll: {student.rollNumber}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    {student.rollNumber}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">
                    {student.totalClasses}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="success" className="text-xs">
                      {student.present}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="destructive" className="text-xs">
                      {student.absent}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center hidden lg:table-cell">
                    <Badge variant="warning" className="text-xs">
                      {student.late}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-medium text-sm ${
                        student.percentage >= 75
                          ? "text-green-600"
                          : student.percentage >= 60
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {student.percentage}%
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge
                      variant={
                        student.percentage >= 75
                          ? "success"
                          : student.percentage >= 60
                          ? "warning"
                          : "destructive"
                      }
                      className="text-xs"
                    >
                      {student.percentage >= 75
                        ? "Good"
                        : student.percentage >= 60
                        ? "Average"
                        : "Poor"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
