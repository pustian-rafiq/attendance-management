@echo off
echo ===============================================
echo Building Attendance Management System
echo ===============================================
echo.

cd /d "%~dp0"

echo [1/3] Installing dependencies...
call npm install

echo.
echo [2/3] Building for production...
call npm run build

echo.
echo [3/3] Starting production server...
echo.
echo The application will be available at:
echo http://localhost:3001
echo.
echo ===============================================
echo.

call npm start

