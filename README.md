# Class Attendance Management System

A comprehensive web-based attendance management system designed for universities and educational institutions. Built with modern technologies to provide an efficient and user-friendly solution for tracking student attendance.

## 🎓 Overview

This system enables teachers to efficiently manage class attendance, track student performance, generate reports, and maintain comprehensive attendance records. It's designed specifically for colleges and institutes affiliated with National University.

## ✨ Features

### 🔐 Authentication

- Secure login system for teachers and administrators
- Role-based access control
- Demo accounts for testing

### 📊 Dashboard

- Real-time attendance statistics
- Course overview with progress tracking
- Today's class schedule
- Quick access to attendance marking
- Visual charts and metrics

### ✅ Attendance Management

- Quick and easy attendance marking
- Multiple status options (Present, Absent, Late, Excused)
- Search and filter students
- Real-time attendance statistics
- Lecture topic tracking
- Date-based attendance records

### 👥 Student Management

- Comprehensive student database
- Advanced filtering (Department, Semester, Status)
- Student profiles with contact information
- Enrollment status tracking
- Export student data to CSV

### 📚 Course Management

- Course catalog with detailed information
- Class schedule management
- Progress tracking (Classes completed/total)
- Student enrollment numbers
- Average attendance per course
- Course-wise statistics

### 📈 Reports & Analytics

- Student-wise attendance reports
- Course-wise statistics
- Overall attendance trends
- Exportable reports (CSV format)
- Performance indicators
- Attendance percentage tracking

### 👤 Profile Management

- User profile editing
- Contact information management
- Teaching load overview
- Course assignments

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3
- **UI Components:** shadcn/ui (Radix UI)
- **State Management:** Zustand
- **Icons:** Lucide React
- **Data Tables:** TanStack Table

## 📦 Installation

1. **Clone or navigate to the project directory:**

   ```bash
   cd attendance-management
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3001
   ```

## 🎯 Usage

### Demo Accounts

The system includes pre-configured demo accounts for testing:

**Teacher Account:**

- Email: `teacher@example.com`
- Password: `any password` (authentication is mocked for demo)

**Admin Account:**

- Email: `admin@example.com`
- Password: `any password` (authentication is mocked for demo)

### Quick Start Guide

1. **Login:** Use one of the demo accounts to log in
2. **Dashboard:** View your course overview and today's classes
3. **Take Attendance:** Navigate to "Take Attendance" to mark student attendance
4. **View Students:** Browse and filter student information
5. **Manage Courses:** View detailed course information and schedules
6. **Generate Reports:** Access comprehensive attendance reports and analytics
7. **Profile:** Update your personal information

## 📁 Project Structure

```
attendance-management/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── dashboard/          # Dashboard pages
│   │   │   ├── attendance/     # Attendance taking
│   │   │   ├── courses/        # Course management
│   │   │   ├── reports/        # Reports & analytics
│   │   │   ├── students/       # Student management
│   │   │   └── profile/        # Profile page
│   │   ├── login/              # Login page
│   │   └── layout.tsx          # Root layout
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── layout/             # Layout components
│   │   └── dashboard/          # Dashboard components
│   ├── lib/                    # Utility functions
│   │   ├── utils.ts            # Helper functions
│   │   └── mock-data.ts        # Mock data
│   ├── stores/                 # Zustand stores
│   │   └── auth-store.ts       # Authentication store
│   └── types/                  # TypeScript types
│       └── index.ts            # Type definitions
├── public/                     # Static assets
└── package.json                # Dependencies
```

## 🎨 Key Features Explained

### Attendance Tracking

- Mark attendance for entire class in one session
- Multiple attendance status options
- Search functionality for quick student lookup
- Real-time statistics display
- Save and edit attendance records

### Reporting System

- Student-wise attendance reports with detailed breakdown
- Course statistics with average attendance
- Export functionality for external analysis
- Visual progress indicators
- Status-based categorization (Excellent, Good, Average, Poor, Critical)

### User-Friendly Interface

- Responsive design for mobile and desktop
- Intuitive navigation
- Quick access to frequently used features
- Visual feedback for actions
- Modern and clean UI

## 🔄 Data Management

Currently, the system uses mock data stored in `src/lib/mock-data.ts`. This includes:

- Sample teachers
- Student records
- Course information
- Department data
- Attendance records

### Future API Integration

The application is designed to easily integrate with a backend API. Key integration points:

- Authentication endpoints
- CRUD operations for students, courses, and attendance
- Report generation API
- Data export functionality

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Environment Variables

Create a `.env.local` file for environment-specific configurations:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:

- Desktop computers
- Tablets
- Mobile devices

Mobile features include:

- Collapsible sidebar navigation
- Touch-friendly interface
- Optimized table views
- Mobile-first design approach

## 🎓 Use Cases

### For Teachers

- Take daily attendance efficiently
- Track student attendance patterns
- Generate attendance reports
- Monitor course progress
- Manage multiple courses

### For Administrators

- Overview of all courses and teachers
- Institution-wide attendance statistics
- Student enrollment management
- Department-wise analytics
- Data export for reporting

## 🔒 Security Features

- Secure authentication
- Role-based access control
- Protected routes
- Session management
- Data validation

## 📊 Statistics & Analytics

The system provides comprehensive analytics:

- Overall attendance percentage
- Course-wise attendance trends
- Student performance indicators
- Department statistics
- Time-based analysis

## 🎯 Target Users

- **Primary:** University teachers and instructors
- **Secondary:** Academic administrators
- **Tertiary:** Department heads and coordinators

## 🤝 Contributing

This is a university final year project. For suggestions or improvements:

1. Document the feature request
2. Create a detailed proposal
3. Test thoroughly before implementation

## 📝 License

This project is created for educational purposes as a university final year project.

## 👨‍💻 Development

### Available Scripts

- `npm run dev` - Start development server (port 3001)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Quality

The project follows:

- TypeScript strict mode
- ESLint configuration
- Component-based architecture
- Consistent naming conventions
- Comprehensive type definitions

## 🌟 Future Enhancements

Potential features for future versions:

- Real-time notifications
- Email notifications for low attendance
- QR code-based attendance
- Mobile app version
- Biometric integration
- Advanced analytics with charts
- Academic calendar integration
- Leave request management
- Parent/Guardian portal
- Attendance prediction using ML

## 📞 Support

For issues or questions about this project:

- Review the code documentation
- Check the type definitions
- Refer to component comments
- Test with demo accounts

## 🙏 Acknowledgments

- Built with Next.js and modern React patterns
- UI components from shadcn/ui
- Icons from Lucide React
- Styled with Tailwind CSS

---

**Note:** This is a demo application using mock data. For production use, integrate with a proper backend API and database system.
