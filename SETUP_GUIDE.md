# Eventora - Setup Guide

## Project Overview

Eventora is an Event Management System built using:

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Email OTP Verification
* Thunder Client / Postman for API Testing

Features:

* User Registration
* Email OTP Verification
* User Login
* JWT Authentication
* Event Management (CRUD)
* Event Booking
* Booking OTP Verification
* Booking Confirmation
* Booking Cancellation

---

# Prerequisites

Install the following software:

### Node.js

Download and install:

https://nodejs.org

Verify installation:

```bash
node -v
npm -v
```

### MongoDB Atlas

Create a free cluster on:

https://www.mongodb.com/atlas

Copy the connection string.

---

# Project Installation

## Clone Repository

```bash
git clone <repository-url>
cd Eventora
```

Or download the project ZIP and extract it.

---

## Backend Setup

Navigate to server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a file named:

```text
.env
```

Inside the server folder.

Add the following variables:

```env
PORT=5000

MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/eventoraDev

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

---

# Gmail Configuration

Enable 2-Step Verification on your Gmail account.

Generate an App Password:

Google Account → Security → App Passwords

Use the generated password in:

```env
EMAIL_PASS=your_app_password
```

---

# Start Backend Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Expected output:

```bash
Connected to MongoDB
Server is running on port 5000
```

---

# API Base URL

```text
http://localhost:5000/api
```

---

# Authentication APIs

## Register User

POST

```text
/api/auth/register
```

Body:

```json
{
  "name": "Yashu",
  "email": "yashu@test.com",
  "password": "123456"
}
```

---

## Verify OTP

POST

```text
/api/auth/verify-otp
```

Body:

```json
{
  "email": "yashu@test.com",
  "otp": "123456"
}
```

---

## Login

POST

```text
/api/auth/login
```

Body:

```json
{
  "email": "yashu@test.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

Copy the token for protected routes.

---

# Event APIs

## Get All Events

GET

```text
/api/event
```

---

## Get Event By ID

GET

```text
/api/event/:id
```

---

## Create Event (Admin)

POST

```text
/api/event
```

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

Body:

```json
{
  "title": "Tech Fest 2026",
  "description": "Annual Tech Festival",
  "date": "2026-07-10",
  "location": "Delhi",
  "category": "Technology",
  "totalSeats": 100,
  "ticketPrice": 500,
  "imageUrl": "https://example.com/image.jpg"
}
```

---

## Update Event

PUT

```text
/api/event/:id
```

---

## Delete Event

DELETE

```text
/api/event/:id
```

---

# Booking APIs

## Send Booking OTP

POST

```text
/api/booking/send-otp
```

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

---

## Book Event

POST

```text
/api/booking
```

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

Body:

```json
{
  "eventId": "EVENT_ID",
  "otp": "BOOKING_OTP"
}
```

---

## Get My Bookings

GET

```text
/api/booking/my
```

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

---

## Confirm Booking (Admin)

PUT

```text
/api/booking/:id/confirm
```

Body:

```json
{
  "paymentStatus": "paid"
}
```

---

## Cancel Booking

DELETE

```text
/api/booking/:id
```

---

# Project Structure

```text
Eventora/
│
├── client/
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── README.md
└── SETUP_GUIDE.md
```

---

# Common Issues

## MongoDB Connection Error

Check:

```env
MONGO_URI
```

Verify Atlas IP Whitelist:

```text
0.0.0.0/0
```

---

## Email Not Sending

Verify:

```env
EMAIL_USER
EMAIL_PASS
```

Use Gmail App Password.

---

## Unauthorized Error

Make sure JWT token is provided:

```text
Authorization: Bearer JWT_TOKEN
```

---

## Invalid OTP

Generate a fresh OTP before verification.

---

# Author

Yashu

Eventora - Event Management System
