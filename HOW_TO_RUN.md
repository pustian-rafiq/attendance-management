# 🎯 How to Run - Quick Start Guide

## ⚡ Super Quick Start (3 Commands)

```bash
# 1. Navigate to project
cd attendance-management

# 2. Install dependencies (first time only)
npm install

# 3. Start development server
npm run dev
```

**Open browser**: http://localhost:3001  
**Login**: teacher@example.com (any password)

---

## 🪟 Windows Users

### Method 1: Double-click Script

1. Open the `attendance-management` folder
2. Double-click `start.bat`
3. Browser will show login page
4. Use: `teacher@example.com` (any password)

### Method 2: Command Line

```cmd
cd attendance-management
npm run dev
```

---

## 🐧 Linux/Mac Users

### Method 1: Use Shell Script

```bash
cd attendance-management
chmod +x start.sh
./start.sh
```

### Method 2: NPM Command

```bash
cd attendance-management
npm run dev
```

---

## 🎓 Demo Accounts

### Teacher Account (Full Access):

- **Email**: teacher@example.com
- **Password**: any text (mock authentication)
- **Features**: Take attendance, manage courses, view reports

### Admin Account:

- **Email**: admin@example.com
- **Password**: any text
- **Features**: Full system access

### Other Teacher Accounts:

- maria.garcia@example.com
- rahman.ali@example.com
- lisa.chen@example.com

---

## 📋 What to Do After Login

### 1. Explore Dashboard

- View statistics
- Check today's classes
- See course overview

### 2. Take Attendance

- Click "Take Attendance" in sidebar
- Select a course
- Mark students (Present/Absent/Late/Excused)
- Click "Save Attendance"

### 3. View Students

- Click "Students"
- Use search and filters
- Export to CSV

### 4. Manage Courses

- Click "Courses"
- View course cards
- Click "View Details" for any course

### 5. Generate Reports

- Click "Reports"
- View student attendance reports
- Export data to CSV

### 6. Update Profile

- Click "Profile"
- Edit your information
- Save changes

---

## 🚀 Production Mode

### Build and Run:

```bash
cd attendance-management
npm run build
npm start
```

### Or Use Script (Windows):

```cmd
build-and-start.bat
```

---

## ❓ Common Questions

### Q: What port does it use?

**A**: Port 3001 by default. Change in `package.json` if needed.

### Q: Do I need a database?

**A**: No! Uses mock data. Perfect for testing and presentation.

### Q: Can I modify the data?

**A**: Yes! Edit `src/lib/mock-data.ts` to add/modify students, courses, etc.

### Q: Is it mobile-friendly?

**A**: Yes! Fully responsive. Test on your phone.

### Q: Can I deploy it?

**A**: Yes! See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for instructions.

---

## 🔧 Troubleshooting

### Issue: Port already in use

```bash
# Option 1: Kill the process
taskkill /F /IM node.exe

# Option 2: Change port in package.json
"dev": "next dev -p 3002"
```

### Issue: npm install fails

```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Module not found

```bash
# Reinstall dependencies
npm install
```

### Issue: Build errors

```bash
# Clean and rebuild
rm -rf .next
npm run build
```

---

## 📊 System Requirements

### Minimum:

- **Node.js**: 18.0 or higher
- **RAM**: 4GB
- **Disk**: 500MB free space
- **Browser**: Modern browser (Chrome, Firefox, Edge, Safari)

### Recommended:

- **Node.js**: 20.0 or higher
- **RAM**: 8GB
- **Disk**: 1GB free space
- **Internet**: For downloading dependencies

---

## 🎬 First Time Setup

### Complete Setup Process:

1. **Install Node.js** (if not installed):

   - Download from: https://nodejs.org
   - Install LTS version

2. **Clone or Navigate to Project**:

```bash
cd attendance-management
```

3. **Install Dependencies**:

```bash
npm install
```

_This may take 2-3 minutes_

4. **Start Application**:

```bash
npm run dev
```

5. **Access Application**:
   - Open: http://localhost:3001
   - Login: teacher@example.com
   - Password: anything

---

## 🌟 Features to Test

After running the app, test these features:

- [ ] Login with demo account
- [ ] View dashboard statistics
- [ ] Take attendance for a course
- [ ] Search and filter students
- [ ] View course details
- [ ] Generate and export reports
- [ ] Update profile information
- [ ] Test on mobile device

---

## 📱 Mobile Testing

### On Your Phone:

1. Make sure phone and computer are on same WiFi
2. Find your computer's IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`
3. On phone, open: `http://YOUR_IP:3001`
4. Test responsive design

---

## 🎨 Customization

### Change App Name:

Edit `src/app/layout.tsx`:

```typescript
export const metadata = {
  title: "Your Custom Title",
  description: "Your custom description",
};
```

### Change Colors:

Edit `tailwind.config.js` and `src/app/globals.css`

### Add More Students:

Edit `src/lib/mock-data.ts` in the `students` array

---

## 🚀 Ready to Present?

### Your project includes:

✅ **7 Major Features**
✅ **60+ Total Features**
✅ **Fully Responsive Design**
✅ **Production Build Ready**
✅ **Complete Documentation**
✅ **Easy to Deploy**

### Demo Flow:

1. Show login page
2. Login and show dashboard
3. Take attendance demo
4. Show student management
5. Display reports
6. Export CSV
7. Show mobile responsiveness

---

## 💡 Pro Tips

1. **Clear Browser Cache**: If styles look wrong
2. **Use Incognito**: To test fresh user experience
3. **Check Console**: Open DevTools to see logs
4. **Test All Features**: Before presenting
5. **Record Demo**: For presentation backup

---

## 📞 Help

### If Something Goes Wrong:

1. **Check** [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. **Run** verification: `node verify-installation.js`
3. **Rebuild**: `npm run build`
4. **Restart**: Close terminal and start again

---

## ✅ You're All Set!

**To start right now:**

```bash
npm run dev
```

**Then open**: http://localhost:3001

**Login with**: teacher@example.com

**Enjoy your attendance management system!** 🎓✨
