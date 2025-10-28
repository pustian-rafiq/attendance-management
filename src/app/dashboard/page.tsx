"use client";

import { StatCard } from "@/components/dashboard/stat-card";
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
import { attendanceRecords, courses, students } from "@/lib/mock-data";
import { calculateAttendancePercentage, formatDate } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import {
  BookOpen,
  Calendar,
  ChevronRight,
  ClipboardList,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuthStore();

  // Get teacher's courses
  const teacherCourses =
    user?.role === "teacher"
      ? courses.filter((c) => c.teacherId === user.id)
      : courses;

  // Calculate statistics
  const totalCourses = teacherCourses.length;
  const totalStudents = students.length;

  // Today's date
  const today = new Date().toISOString().split("T")[0];

  // Get today's classes
  const todayClasses = teacherCourses.filter((course) => {
    const dayOfWeek = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });
    return course.classSchedule.some(
      (schedule) => schedule.dayOfWeek === dayOfWeek
    );
  });

  // Calculate total completed classes
  const totalCompletedClasses = teacherCourses.reduce(
    (sum, course) => sum + course.completedClasses,
    0
  );

  // Calculate average attendance
  const totalAttendance = attendanceRecords.filter(
    (r) =>
      teacherCourses.some((c) => c.id === r.courseId) && r.status === "present"
  ).length;
  const totalRecords = attendanceRecords.filter((r) =>
    teacherCourses.some((c) => c.id === r.courseId)
  ).length;
  const avgAttendance = calculateAttendancePercentage(
    totalAttendance,
    totalRecords
  );

  // Get recent courses with enrollment
  const recentCourses = teacherCourses.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-muted-foreground">
          Here's an overview of your class attendance management
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Courses"
          value={totalCourses}
          description="Active courses this semester"
          icon={BookOpen}
        />
        <StatCard
          title="Total Students"
          value={totalStudents}
          description="Enrolled across all courses"
          icon={Users}
        />
        <StatCard
          title="Classes Completed"
          value={totalCompletedClasses}
          description="Total classes conducted"
          icon={ClipboardList}
        />
        <StatCard
          title="Average Attendance"
          value={`${avgAttendance}%`}
          description="Overall attendance rate"
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Classes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Today's Classes</CardTitle>
                <CardDescription>{formatDate(new Date())}</CardDescription>
              </div>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {todayClasses.length > 0 ? (
              <div className="space-y-4">
                {todayClasses.map((course) => {
                  const schedule = course.classSchedule.find(
                    (s) =>
                      s.dayOfWeek ===
                      new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                      })
                  );
                  return (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {course.code} • {schedule?.startTime} -{" "}
                          {schedule?.endTime}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Room: {schedule?.roomNumber}
                        </p>
                      </div>
                      <Link href="/dashboard/attendance">
                        <Button size="sm">
                          Take Attendance
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No classes scheduled for today
              </p>
            )}
          </CardContent>
        </Card>

        {/* Course Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
            <CardDescription>Your active courses this semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCourses.map((course) => {
                const progress = Math.round(
                  (course.completedClasses / course.totalClasses) * 100
                );
                return (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{course.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {course.code} • {course.enrolledStudents} students
                        </p>
                      </div>
                      <Badge variant="secondary">{progress}%</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              {recentCourses.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No courses assigned yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>My Courses</CardTitle>
          <CardDescription>
            Overview of all your assigned courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teacherCourses.map((course) => {
                const progress = Math.round(
                  (course.completedClasses / course.totalClasses) * 100
                );
                return (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.code}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.enrolledStudents}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {course.completedClasses}/{course.totalClasses}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{course.semester}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/dashboard/courses/${course.id}`}>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {teacherCourses.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No courses found
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
