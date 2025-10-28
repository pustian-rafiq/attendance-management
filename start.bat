@echo off
echo ===============================================
echo Class Attendance Management System
echo ===============================================
echo.
echo Starting development server...
echo.
echo The application will be available at:
echo http://localhost:3001
echo.
echo Demo Login Credentials:
echo Email: teacher@example.com
echo Password: any password
echo.
echo ===============================================
echo.

cd /d "%~dp0"
call npm run dev

