# DriveFleet Server

![Node.js](https://img.shields.io/badge/Node.js-LTS-339933)
![Express.js](https://img.shields.io/badge/Express.js-5-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248)
![JWT](https://img.shields.io/badge/JWT-Authentication-black)
![Firebase](https://img.shields.io/badge/Firebase-Authentication-FFCA28)
![Render](https://img.shields.io/badge/Deployment-Render-46E3B7)


DriveFleet Server is the RESTful backend API powering the DriveFleet car rental platform. It provides secure authentication, protected APIs, car listing management, booking operations, and owner-based authorization while using MongoDB for persistent data storage.

---

## Live API

🔗 https://drivefleet-server-4yzt.onrender.com

---

# Key Features

## Authentication

- JWT-based authentication
- Secure HTTPOnly cookie management
- Firebase authenticated user support
- Protected API routes
- Login and logout endpoints

## Car Management

- Add new car listings
- Retrieve all available cars
- Retrieve individual car details
- Update existing car listings
- Delete car listings
- Owner-specific car management

## Booking Management

- Book rental vehicles
- Retrieve user bookings
- Cancel existing bookings
- Automatic booking count tracking
- Rental cost calculation support

## Security

- Protected private APIs
- Owner authorization middleware
- JWT verification middleware
- Secure cookie handling
- Environment variable protection

## Database

- MongoDB Atlas integration
- Optimized CRUD operations
- Owner-specific queries
- Booking data management
- Car inventory management

---

# Technology Stack

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- MongoDB Driver

## Authentication

- JSON Web Token (JWT)
- HTTPOnly Cookies
- Firebase Authentication

## Deployment

- Render

---

# 📦 Packages Used

- express
- mongodb
- jsonwebtoken
- cookie-parser
- cors
- dotenv

---

#  API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/jwt` | Generate JWT Token |
| POST | `/api/logout` | Clear Authentication Cookie |

### Cars

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cars` | Get All Cars |
| GET | `/api/cars/home` | Get Home Page Cars |
| GET | `/api/cars/:id` | Get Single Car |
| POST | `/api/cars` | Add New Car |
| PATCH | `/api/cars/:id` | Update Car |
| DELETE | `/api/cars/:id` | Delete Car |
| GET | `/api/my-cars` | Get User's Cars |

### Bookings

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Book a Car |
| GET | `/api/bookings` | Get User Bookings |
| DELETE | `/api/bookings/:id` | Cancel Booking |

---

# Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/mohammedrakibcodes/drivefleet-server.git
```

## 2. Navigate to the Project Directory

```bash
cd drivefleet-server
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Configure Environment Variables

Create a `.env` file in the project root and add the following variables:

```env
PORT=8000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:3000

NODE_ENV=development
```

## 5. Start the Development Server

```bash
npm run dev
```

or

```bash
npm start
```

The server will run on:

```text
http://localhost:8000
```

---

#  Project Highlights

- Built with Express.js using a modular MVC architecture
- RESTful API design with organized routes and controllers
- JWT authentication with secure HTTPOnly Cookies
- Owner-based authorization for protected operations
- MongoDB Atlas integration for cloud database management
- Secure environment variable configuration
- Optimized CRUD operations for cars and bookings
- Production-ready deployment on Render

---

# License

This project is developed for educational and portfolio purposes.
