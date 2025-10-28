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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { courses, departments } from "@/lib/mock-data";
import { getInitials } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { Teacher } from "@/types";
import {
  BookOpen,
  Building,
  Calendar,
  Edit,
  Mail,
  Phone,
  Save,
  User,
} from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: (user as Teacher)?.phone || "",
  });

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: (user as Teacher)?.phone || "",
    });
    setIsEditing(false);
  };

  const teacher = user as Teacher;
  const department = departments.find((d) => d.id === teacher?.departmentId);
  const teacherCourses = courses.filter((c) => c.teacherId === user?.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Your profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-2xl">
                  {user?.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-xl font-semibold">{user?.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground break-all">
                  {user?.email}
                </span>
              </div>
              {teacher?.phone && (
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{teacher.phone}</span>
                </div>
              )}
              {department && (
                <div className="flex items-center space-x-3 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {department.name}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </div>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
              {teacher?.employeeId && (
                <div className="space-y-2">
                  <Label>Employee ID</Label>
                  <Input value={teacher.employeeId} disabled />
                </div>
              )}
              {teacher?.designation && (
                <div className="space-y-2">
                  <Label>Designation</Label>
                  <Input value={teacher.designation} disabled />
                </div>
              )}
              {department && (
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Input value={department.name} disabled />
                </div>
              )}
              {teacher?.joinDate && (
                <div className="space-y-2">
                  <Label>Join Date</Label>
                  <Input
                    value={new Date(teacher.joinDate).toLocaleDateString()}
                    disabled
                  />
                </div>
              )}
            </div>

            {isEditing && (
              <div className="flex items-center space-x-2">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            )}

            {isSaved && (
              <div className="p-4 bg-green-50 text-green-800 rounded-lg">
                Profile updated successfully!
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Teaching Information */}
      {user?.role === "teacher" && (
        <Card>
          <CardHeader>
            <CardTitle>Teaching Information</CardTitle>
            <CardDescription>
              Courses you are teaching this semester
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {teacherCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 border rounded-lg space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <Badge variant="secondary">{course.code}</Badge>
                      <h3 className="font-semibold">{course.name}</h3>
                    </div>
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Credits</p>
                      <p className="font-medium">{course.credits}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Students</p>
                      <p className="font-medium">{course.enrolledStudents}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Semester</p>
                      <p className="font-medium">{course.semester}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Classes</p>
                      <p className="font-medium">
                        {course.completedClasses}/{course.totalClasses}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1 pt-2 border-t">
                    {course.classSchedule.map((schedule) => (
                      <div
                        key={schedule.id}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="text-muted-foreground">
                          {schedule.dayOfWeek}
                        </span>
                        <span className="font-medium">
                          {schedule.startTime} - {schedule.endTime}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {teacherCourses.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No courses assigned yet
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      {user?.role === "teacher" && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Courses
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teacherCourses.length}</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teacherCourses.reduce(
                  (sum, course) => sum + course.enrolledStudents,
                  0
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all courses
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Classes Completed
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teacherCourses.reduce(
                  (sum, course) => sum + course.completedClasses,
                  0
                )}
              </div>
              <p className="text-xs text-muted-foreground">Total classes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Credits
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teacherCourses.reduce(
                  (sum, course) => sum + course.credits,
                  0
                )}
              </div>
              <p className="text-xs text-muted-foreground">Teaching load</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
