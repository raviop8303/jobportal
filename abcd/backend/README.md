# Job Portal Backend API

Complete Node.js/Express backend for Job Listing Portal with MongoDB.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Environment Variables
Create `.env` file in backend folder:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
```

### 3. Install & Start MongoDB
**Option A: Local MongoDB**
```bash
# Download from: https://www.mongodb.com/try/download/community
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Replace MONGODB_URI in .env

### 4. Start Server
```bash
npm start
# or for development with auto-restart
npm run dev
```

Server will run on: http://localhost:5000

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Jobs
- `GET /api/jobs` - Get all jobs (Public)
- `GET /api/jobs/:id` - Get single job (Public)
- `POST /api/jobs` - Create job (Employer only)
- `PUT /api/jobs/:id` - Update job (Employer only)
- `DELETE /api/jobs/:id` - Delete job (Employer only)
- `GET /api/jobs/employer/my-jobs` - Get employer's jobs (Employer only)

### Applications
- `POST /api/applications` - Apply for job (Job Seeker only)
- `GET /api/applications/my-applications` - Get user's applications (Job Seeker only)
- `GET /api/applications/job/:jobId` - Get job applications (Employer only)
- `PUT /api/applications/:id` - Update application status (Employer only)

### Profile
- `GET /api/profile` - Get user profile (Protected)
- `PUT /api/profile` - Update profile (Protected)
- `POST /api/profile/upload-resume` - Upload resume (Job Seeker only)
- `DELETE /api/profile/resume` - Delete resume (Job Seeker only)

## 🧪 Testing with Postman

### 1. Register User
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "jobseeker"
}
```

### 2. Login
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "john@example.com",
  "password": "123456"
}
```
Copy the `token` from response.

### 3. Protected Routes
Add header to all protected routes:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

## 📁 Project Structure
```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── jobController.js     # Job CRUD operations
│   ├── applicationController.js
│   └── profileController.js
├── middleware/
│   ├── auth.js              # JWT verification
│   └── upload.js            # File upload (Multer)
├── models/
│   ├── User.js              # User schema
│   ├── Job.js               # Job schema
│   └── Application.js       # Application schema
├── routes/
│   ├── authRoutes.js
│   ├── jobRoutes.js
│   ├── applicationRoutes.js
│   └── profileRoutes.js
├── uploads/                 # Resume uploads folder
├── .env                     # Environment variables
├── server.js                # Main server file
└── package.json
```

## 🔐 Security Features
- Password hashing with bcrypt
- JWT authentication
- Role-based authorization
- File upload validation
- Input validation

## 🛠️ Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads
- CORS enabled

## 📝 Notes
- Default port: 5000
- JWT expires in 7 days
- Resume file size limit: 2MB
- Allowed resume formats: PDF, DOC, DOCX

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Make sure MongoDB is running
- Check MONGODB_URI in .env file

**Port Already in Use:**
- Change PORT in .env file
- Or kill process: `netstat -ano | findstr :5000`

**JWT Error:**
- Make sure JWT_SECRET is set in .env
- Check Authorization header format

## 👥 Created By
Group 19 - Web Development Project
