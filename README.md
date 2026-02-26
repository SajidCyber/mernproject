# Smart Food Waste Reduction Application

A MERN (MongoDB, Express, React, Node.js) full-stack application for managing and sharing food with expiry dates to reduce food waste.

## Run backend first : https://smart-food-waste-xq9w.onrender.com
## Run frontend : https://smart-food-waste.vercel.app

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Local Setup](#local-setup)
- [Deployment Guide](#deployment-guide)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)

## Features
- User authentication (Donor & Recipient roles)
- Post food items with location and expiry date
- Find nearby food items
- Claim food items
- Email notifications
- Automatic expiry date checking

## Tech Stack
- **Frontend**: React 18, Vite, Axios, React Router, Leaflet (Maps)
- **Backend**: Node.js, Express, MongoDB, JWT, Multer (File Upload)
- **Deployment**: Render (Backend), Vercel (Frontend)

---

## Local Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud - MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/SajidCyber/mernproject.git
cd mernproject
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your values:
# - MONGO_URI: MongoDB connection string
# - JWT_SECRET: Your secret key
# - EMAIL_USER and EMAIL_PASS: Gmail credentials (with App Password)
# - CORS_ORIGIN: Frontend URL (for local: http://localhost:5173)
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your backend URL:
# VITE_API_URL=http://localhost:5000/api
```

### Running Locally

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server will run on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App will run on http://localhost:5173
```

Visit `http://localhost:5173` in your browser.

---

## Deployment Guide

### 1. Deploy Backend to Render

#### Prerequisites
- Render account (free tier available)
- MongoDB Atlas account (free tier available)
- GitHub repository

#### Steps

1. **Set up MongoDB Atlas**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection URI: `mongodb+srv://username:password@cluster.mongodb.net/smartfood`

2. **Push to GitHub**
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

3. **Deploy on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Choose the repo: `mernproject`
   - Configuration:
     - **Name**: `smartfood-backend`
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free (or paid if needed)

4. **Add Environment Variables**
   - In Render dashboard, go to your service → "Environment"
   - Add these variables:
     ```
     MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smartfood
     JWT_SECRET=your_secure_random_string_here
     NODE_ENV=production
     PORT=5000
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASS=your_app_password
     CORS_ORIGIN=https://your-frontend-domain.vercel.app
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait for the build and deployment (5-10 minutes)
   - Your backend URL will be: `https://smartfood-backend.onrender.com`

**Note**: Render's free tier has limitations (services spin down after 15 minutes of inactivity). For production, upgrade to a paid plan.

---

### 2. Deploy Frontend to Vercel

#### Prerequisites
- Vercel account (free tier available)
- GitHub repository

#### Steps

1. **Push latest code to GitHub**
```bash
git add .
git commit -m "Ready for frontend deployment"
git push origin main
```

2. **Deploy on Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Configuration:
     - **Framework**: Vite
     - **Root Directory**: `./frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Add Environment Variables**
   - Go to Project Settings → "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://smartfood-backend.onrender.com/api
     ```
   - Select which environments: Production, Preview, Development

4. **Deploy**
   - Click "Deploy"
   - Wait for build (2-5 minutes)
   - Your frontend URL will be: `https://your-project-name.vercel.app`

5. **Update Backend CORS**
   - Go back to Render → Backend service
   - Edit `CORS_ORIGIN` environment variable
   - Set it to: `https://your-project-name.vercel.app`
   - Click "Save Changes" (will redeploy)

---

## Environment Variables

### Backend (.env)
```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smartfood

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production

# Email Service
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_not_regular_password

# CORS
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

### Frontend (.env)
```env
# For development:
VITE_API_URL=http://localhost:5000/api

# For production (Render):
VITE_API_URL=https://smartfood-backend.onrender.com/api
```

### Getting Gmail App Password
1. Enable 2-Step Verification on your Google Account
2. Go to [Google Account Security](https://myaccount.google.com/security)
3. Find "App passwords" → Generate password for "Mail" and "Windows Computer"
4. Use this password in `EMAIL_PASS`

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Food Items
- `GET /api/foods/nearby` - Get nearby food items (requires location)
- `GET /api/foods/mine` - Get user's posted food
- `POST /api/foods` - Post new food item
- `PATCH /api/foods/:id/status` - Update food status

### Claims
- `GET /api/claims` - Get all claims
- `POST /api/claims` - Claim a food item
- `PATCH /api/claims/:id/status` - Update claim status

---

## Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` in frontend `.env`
- Ensure backend is running on correct port
- Check CORS settings in backend

### MongoDB connection fails
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for testing)
- Ensure cluster is active in MongoDB Atlas

### Render service keeps going down
- Upgrade from free to paid plan
- Check logs in Render dashboard
- Verify all environment variables are set

### Email notifications not working
- Use Gmail App Password (not regular password)
- Enable Less Secure App Access if using regular Gmail
- Check EMAIL_USER and EMAIL_PASS in backend `.env`

---

## Security Best Practices

1. **Never commit `.env` file** - Use `.env.example` for templates
2. **Change JWT_SECRET** - Use a strong random string
3. **Use MongoDB IP Whitelist** - Allow only trusted IPs (or 0.0.0.0/0 for development)
4. **HTTPS Only** - Vercel and Render both use HTTPS by default
5. **CORS Configuration** - Only allow your frontend domain

---

## Performance Tips

### Frontend (Vercel)
- Build is optimized automatically
- Vercel provides CDN globally

### Backend (Render)
- Upgrade to paid plan for 24/7 uptime
- Consider scaling horizontally for high loads

---

## Common Issues & Setup

- **Backend port**: the Express server listens on `PORT` (default 5000).
- **Frontend API URL**: the React/Vite app reads `VITE_API_URL` from `.env` or defaults to `http://localhost:5000/api`.
  If you see `ERR_CONNECTION_REFUSED` connecting to `http://localhost:5001`, either start the backend on 5001 or set the variable appropriately.

- **favicon**: a `favicon.ico` is now served from `frontend/public`; ensure the `<link rel="icon">` tag in `index.html` points there.

---

## License
MIT

## Author
Sajid Cyber


