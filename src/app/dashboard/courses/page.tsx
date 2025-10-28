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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  attendanceRecords,
  courses,
  departments,
  teachers,
} from "@/lib/mock-data";
import { calculateAttendancePercentage } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import {
  BookOpen,
  Calendar,
  ClipboardList,
  Clock,
  Eye,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CoursesPage() {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");

  // Get teacher's courses
  const teacherCourses =
    user?.role === "teacher"
      ? courses.filter((c) => c.teacherId === user.id)
      : courses;

  // Filter courses
  const filteredCourses = teacherCourses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "all" ||
      course.departmentId === selectedDepartment;

    const matchesSemester =
      selectedSemester === "all" || course.semester === selectedSemester;

    return matchesSearch && matchesDepartment && matchesSemester;
  });

  // Get unique semesters
  const semesters = Array.from(new Set(courses.map((c) => c.semester)));

  // Calculate course statistics
  const getCourseAttendance = (courseId: string) => {
    const courseRecords = attendanceRecords.filter(
      (r) => r.courseId === courseId
    );
    const presentCount = courseRecords.filter(
      (r) => r.status === "present"
    ).length;
    return calculateAttendancePercentage(presentCount, courseRecords.length);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Courses
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your courses and view details
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherCourses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teacherCourses.reduce((sum, c) => sum + c.enrolledStudents, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Classes Completed
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teacherCourses.reduce((sum, c) => sum + c.completedClasses, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teacherCourses.reduce((sum, c) => sum + c.credits, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            Filter courses by department and semester
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedSemester}
              onValueChange={setSelectedSemester}
            >
              <SelectTrigger>
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {semesters.map((semester) => (
                  <SelectItem key={semester} value={semester}>
                    {semester}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => {
          const department = departments.find(
            (d) => d.id === course.departmentId
          );
          const teacher = teachers.find((t) => t.id === course.teacherId);
          const progress = Math.round(
            (course.completedClasses / course.totalClasses) * 100
          );
          const attendance = getCourseAttendance(course.id);

          return (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 flex-1 min-w-0">
                    <Badge variant="secondary" className="text-xs">
                      {course.code}
                    </Badge>
                    <CardTitle className="text-base sm:text-lg truncate">
                      {course.name}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm truncate">
                      {department?.name}
                    </CardDescription>
                  </div>
                  <BookOpen className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Instructor</p>
                    <p className="font-medium text-sm truncate">
                      {teacher?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Credits</p>
                    <p className="font-medium text-sm">{course.credits}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Students</p>
                    <p className="font-medium text-sm">
                      {course.enrolledStudents}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Semester</p>
                    <p className="font-medium text-sm">{course.semester}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {course.completedClasses} of {course.totalClasses} classes
                    completed
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">
                      Avg. Attendance
                    </span>
                    <span
                      className={`font-medium ${
                        attendance >= 75
                          ? "text-green-600"
                          : attendance >= 60
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {attendance}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <p className="text-xs sm:text-sm font-medium">
                    Class Schedule:
                  </p>
                  {course.classSchedule.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex items-center justify-between text-xs sm:text-sm gap-2"
                    >
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Calendar className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                        <span className="truncate">{schedule.dayOfWeek}</span>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Clock className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                        <span className="whitespace-nowrap text-xs">
                          {schedule.startTime} - {schedule.endTime}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full" variant="outline" asChild>
                  <Link href={`/dashboard/courses/${course.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No courses found</p>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
