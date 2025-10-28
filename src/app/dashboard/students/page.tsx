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
import { departments, students } from "@/lib/mock-data";
import { exportToCSV, getInitials } from "@/lib/utils";
import { Download, Eye, Mail, Phone, Search, Users } from "lucide-react";
import { useState } from "react";

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Filter students
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "all" ||
      student.departmentId === selectedDepartment;

    const matchesSemester =
      selectedSemester === "all" || student.semester === selectedSemester;

    const matchesStatus =
      selectedStatus === "all" || student.status === selectedStatus;

    return (
      matchesSearch && matchesDepartment && matchesSemester && matchesStatus
    );
  });

  const handleExport = () => {
    const exportData = filteredStudents.map((student) => ({
      "Student ID": student.studentId,
      Name: student.name,
      Email: student.email,
      Phone: student.phone,
      Department: departments.find((d) => d.id === student.departmentId)?.name,
      Semester: student.semester,
      Batch: student.batch,
      "Roll Number": student.rollNumber,
      "Registration Number": student.registrationNumber,
      Status: student.status,
    }));
    exportToCSV(exportData, `students-${new Date().toISOString()}`);
  };

  // Get unique semesters
  const semesters = Array.from(new Set(students.map((s) => s.semester)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Students</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage and view student information
          </p>
        </div>
        <Button onClick={handleExport} className="w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {students.filter((s) => s.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            <Users className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {students.filter((s) => s.status === "inactive").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Graduated</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {students.filter((s) => s.status === "graduated").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            Filter students by department, semester, and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
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
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="graduated">Graduated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Student List ({filteredStudents.length} students)
          </CardTitle>
          <CardDescription>View and manage student information</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Student</TableHead>
                <TableHead className="hidden lg:table-cell">Student ID</TableHead>
                <TableHead className="hidden md:table-cell min-w-[180px]">Contact</TableHead>
                <TableHead className="hidden xl:table-cell">Department</TableHead>
                <TableHead className="hidden sm:table-cell">Semester</TableHead>
                <TableHead className="hidden md:table-cell">Batch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => {
                const department = departments.find(
                  (d) => d.id === student.departmentId
                );
                return (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback className="text-xs sm:text-sm">
                            {getInitials(student.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm sm:text-base">{student.name}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Roll: {student.rollNumber}
                          </p>
                          <p className="text-xs text-muted-foreground sm:hidden">
                            {student.semester} • {student.batch}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs sm:text-sm hidden lg:table-cell">
                      {student.studentId}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center text-xs sm:text-sm">
                          <Mail className="mr-2 h-3 w-3 text-muted-foreground flex-shrink-0" />
                          <span className="truncate max-w-[150px]">{student.email}</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm">
                          <Phone className="mr-2 h-3 w-3 text-muted-foreground flex-shrink-0" />
                          {student.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <div>
                        <p className="font-medium text-sm">{department?.code}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                          {department?.name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{student.semester}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="secondary" className="text-xs">{student.batch}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          student.status === "active"
                            ? "success"
                            : student.status === "inactive"
                            ? "warning"
                            : "info"
                        }
                        className="text-xs"
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right hidden sm:table-cell">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium">No students found</p>
              <p className="text-muted-foreground">
                Try adjusting your filters
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
