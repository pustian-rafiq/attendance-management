# 🚀 Setup Guide - Class Attendance Management System

## Quick Start

Follow these steps to get the application up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.x or higher)
- **npm** (comes with Node.js) or **yarn**
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A code editor (VS Code recommended)

## Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd attendance-management
```

### Step 2: Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

This will install all required packages including:

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Zustand for state management
- And other dependencies

### Step 3: Start Development Server

Using npm:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

The application will start on `http://localhost:3001`

### Step 4: Access the Application

Open your web browser and navigate to:

```
http://localhost:3001
```

You should see the login page.

## Login Credentials

The system uses mock authentication. You can log in with any of these accounts:

### Teacher Account

- **Email:** `teacher@example.com`
- **Password:** Any password (authentication is mocked)
- **Access:** Full teacher dashboard with all features

### Admin Account

- **Email:** `admin@example.com`
- **Password:** Any password (authentication is mocked)
- **Access:** Administrative dashboard

### Other Teacher Accounts

You can also try these emails:

- `maria.garcia@example.com`
- `rahman.ali@example.com`
- `lisa.chen@example.com`

## Project Structure

```
attendance-management/
├── src/
│   ├── app/                          # Next.js 15 App Router
│   │   ├── dashboard/                # Protected dashboard routes
│   │   │   ├── attendance/           # Attendance marking page
│   │   │   ├── courses/              # Course management
│   │   │   │   └── [id]/             # Individual course details
│   │   │   ├── reports/              # Reports and analytics
│   │   │   ├── students/             # Student management
│   │   │   ├── profile/              # User profile
│   │   │   ├── layout.tsx            # Dashboard layout
│   │   │   └── page.tsx              # Dashboard home
│   │   ├── login/                    # Login page
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Root page (redirects to login)
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── select.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── label.tsx
│   │   ├── layout/                   # Layout components
│   │   │   ├── header.tsx            # Top navigation bar
│   │   │   ├── sidebar.tsx           # Desktop sidebar
│   │   │   └── mobile-sidebar.tsx    # Mobile sidebar
│   │   └── dashboard/                # Dashboard-specific components
│   │       └── stat-card.tsx         # Statistics card
│   ├── lib/
│   │   ├── utils.ts                  # Utility functions
│   │   └── mock-data.ts              # Mock data (students, teachers, courses)
│   ├── stores/
│   │   └── auth-store.ts             # Authentication state management
│   └── types/
│       └── index.ts                  # TypeScript type definitions
├── public/                           # Static assets
├── .gitignore                        # Git ignore rules
├── components.json                   # shadcn/ui configuration
├── next.config.js                    # Next.js configuration
├── package.json                      # Project dependencies
├── postcss.config.mjs                # PostCSS configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── README.md                         # Project documentation
└── SETUP_GUIDE.md                   # This file
```

## Available Scripts

### Development

```bash
npm run dev          # Start development server on port 3001
```

### Production Build

```bash
npm run build        # Build for production
npm start            # Start production server
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## Features Overview

### 1. Dashboard

- Real-time statistics
- Today's class schedule
- Course progress overview
- Quick access to features

### 2. Attendance Management

- Quick attendance marking
- Multiple status options (Present, Absent, Late, Excused)
- Search and filter students
- Real-time statistics
- Save attendance records

### 3. Student Management

- Comprehensive student database
- Advanced filtering options
- Export to CSV
- Student profiles

### 4. Course Management

- Course catalog
- Detailed course information
- Class schedules
- Progress tracking
- Student enrollment

### 5. Reports & Analytics

- Student attendance reports
- Course statistics
- Export functionality
- Performance indicators

### 6. Profile Management

- Edit personal information
- View teaching assignments
- Update contact details

## Technology Stack Details

### Frontend Framework

- **Next.js 15**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Beautiful, accessible components
- **Radix UI**: Headless UI primitives

### State Management

- **Zustand**: Lightweight state management
- **React Hooks**: Local state management

### Icons & UI

- **Lucide React**: Beautiful, consistent icons
- **Tailwind CSS Animation**: Smooth transitions

## Development Tips

### 1. Hot Reload

The development server supports hot reload. Any changes you make to the code will automatically refresh the browser.

### 2. Type Safety

The project uses TypeScript strict mode. Make sure all types are properly defined.

### 3. Component Structure

Follow the existing component structure:

- Use functional components
- Implement proper TypeScript interfaces
- Keep components focused and reusable

### 4. Styling Guidelines

- Use Tailwind CSS utility classes
- Follow responsive design patterns
- Maintain consistent spacing

### 5. Code Organization

- Keep files modular
- Use proper naming conventions
- Add comments for complex logic

## Customization

### Changing Port

Edit `package.json`:

```json
"scripts": {
  "dev": "next dev -p 3001",  // Change 3001 to your preferred port
}
```

### Adding New Features

1. Create component in `src/components/`
2. Add page in `src/app/dashboard/`
3. Update navigation in `src/components/layout/sidebar.tsx`
4. Add route protection if needed

### Modifying Mock Data

Edit `src/lib/mock-data.ts` to add or modify:

- Students
- Teachers
- Courses
- Departments
- Attendance records

## API Integration (Future)

To integrate with a real backend:

1. **Create API service files:**

   ```typescript
   // src/services/api.ts
   export const fetchStudents = async () => {
     const response = await fetch("/api/students");
     return response.json();
   };
   ```

2. **Update stores:**
   Replace mock data with API calls in Zustand stores

3. **Add environment variables:**
   Create `.env.local`:

   ```
   NEXT_PUBLIC_API_URL=http://your-api-url.com
   ```

4. **Handle authentication:**
   Implement JWT or session-based auth

## Troubleshooting

### Port Already in Use

If port 3001 is busy:

```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or change port in package.json
```

### Dependencies Installation Issues

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clean Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### TypeScript Errors

```bash
# Run type check
npm run type-check

# Check specific file
npx tsc --noEmit src/path/to/file.tsx
```

## Browser Compatibility

The application works best on:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Mobile browsers are fully supported.

## Performance Tips

1. **Development Mode**: Slower due to hot reload and debugging features
2. **Production Mode**: Much faster, optimized build
3. **Image Optimization**: Uses Next.js Image component
4. **Code Splitting**: Automatic route-based splitting

## Next Steps

After setup:

1. ✅ Explore the dashboard
2. ✅ Try taking attendance
3. ✅ View student records
4. ✅ Check reports
5. ✅ Customize for your needs
6. 🔄 Integrate with real API (optional)
7. 🚀 Deploy to production (optional)

## Deployment Options

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Other Platforms

- Netlify
- Railway
- DigitalOcean
- AWS
- Google Cloud

## Support

For questions or issues:

1. Check the README.md
2. Review the code documentation
3. Check component prop types
4. Test with demo accounts

## License

This project is for educational purposes (university final year project).

---

**Happy Coding! 🎓**
