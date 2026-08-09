# Barber Shop Management System — Frontend

A modern, responsive frontend for a Barber Shop Management System designed to simplify and manage daily barber shop operations.

The application provides a user-friendly interface for managing customers, barbers, bookings, queues, and other shop operations. The frontend is being developed with a mobile-first approach and is designed to integrate with a dedicated RESTful backend API.

> **Status:** 🚧 In Development

---

## Overview

The Barber Shop Management System is designed to provide a centralized platform for managing barber shop operations.

The frontend will allow authorized users such as barbers and administrators to interact with the system through a simple and responsive web interface.

The system is being developed with a clear separation between the frontend and backend:

```text
┌──────────────────────────────┐
│        React Frontend        │
│                              │
│  UI • Pages • Components     │
│  State Management • API      │
└──────────────┬───────────────┘
               │
               │ HTTP / REST API
               ▼
┌──────────────────────────────┐
│       Backend API            │
│                              │
│ Node.js • Express • TS       │
│ PostgreSQL • JWT • REST      │
└──────────────────────────────┘
```

The backend API is developed as a separate project and is responsible for business logic, authentication, authorization, database operations, bookings, queue management, and other server-side functionality.

---

## Current Frontend Stack

The frontend is currently being developed using:

* **React** — Building reusable user interface components
* **TypeScript** — Static typing and improved code maintainability
* **Axios** — HTTP client for communicating with the backend API
* **CSS** — Responsive and component-specific styling

### Planned / Integrated Technologies

As development progresses, the frontend will integrate with the Barber Shop REST API for:

* Authentication
* User management
* Barber management
* Customer management
* Booking management
* Booking slots
* Queue management
* Customer-barber blocking
* Role-based access control

---

## Main Features

The frontend is being designed around the following features:

### Authentication

* User login
* User registration where applicable
* Authentication state management
* Protected routes
* Role-based access
* Secure communication with the backend API

### Barber Management

Authorized users will be able to manage barber-related information and access barber-specific operations.

### Customer Management

The system will provide interfaces for:

* Creating customers
* Viewing customer information
* Updating customer information
* Managing customer records

### Booking Management

The booking interface will allow users to:

* View available booking slots
* Create bookings
* View booking details
* Update booking status
* Manage customer bookings

### Queue Management

The frontend will provide an interface for managing the shop queue, including:

* Viewing the current queue
* Joining the queue
* Tracking queue status
* Managing waiting customers
* Calling the next customer
* Updating queue status

### Customer-Barber Blocking

Barbers and administrators will be able to manage customer-barber blocks through the frontend.

---

## Project Structure

The project follows a modular structure designed to keep the application maintainable and scalable.

```text
src/
│
├── api/
│   └── axios.ts
│
├── components/
│   ├── admin/
│   ├── barber/
│   └── ...
│
├── context/
│   └── ...
│
├── features/
│   ├── auth/
│   ├── barber/
│   ├── customer/
│   ├── booking/
│   └── queue/
│
├── hooks/
│   └── ...
│
├── routes/
│   └── ...
│
├── styles/
│   └── ...
│
├── App.tsx
└── index.tsx
```

The exact structure may evolve as the project continues to grow.

---

## API Communication

The frontend uses **Axios** to communicate with the backend REST API.

A centralized Axios configuration is used to keep API communication consistent across the application.

```text
React Components
       │
       ▼
    Hooks
       │
       ▼
   Services
       │
       ▼
     Axios
       │
       ▼
  REST API
```

This approach separates UI logic from API communication and makes the application easier to maintain.

---

## Authentication Flow

The frontend is designed to work with the backend authentication system using JWT-based authentication.

The general flow is:

```text
User
 │
 ▼
Login Form
 │
 ▼
Auth Service
 │
 ▼
Axios Request
 │
 ▼
Backend API
 │
 ▼
JWT Authentication
 │
 ▼
Authenticated User
 │
 ▼
Protected Application
```

Protected routes will restrict access to authenticated users and role-based permissions will determine which areas of the application can be accessed.

---

## Responsive Design

The frontend is being developed with a **mobile-first approach**.

The interface is intended to work across:

* Mobile devices
* Tablets
* Desktop screens

The UI will adapt to different screen sizes while keeping the main shop-management workflows simple and accessible.

---

## Backend Integration

The frontend is being developed alongside a dedicated backend project.

The backend provides RESTful APIs for the application's core functionality, including:

```text
Authentication
     │
     ├── Users
     │
     ├── Barbers
     │
     ├── Customers
     │
     ├── Booking Slots
     │
     ├── Bookings
     │
     ├── Queue
     │
     └── Customer-Barber Blocks
```

The frontend-backend integration is currently under development.

---

## Development Status

The project is currently under active development.

### Current

* React frontend structure
* TypeScript configuration
* Axios API configuration
* Authentication architecture
* Reusable components
* Feature-based organization
* Responsive UI development

### In Progress

* Backend API integration
* Authentication flow
* Protected routes
* Role-based UI
* Booking management
* Queue management
* Customer management
* Barber management
* Final responsive design

---

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/engbaraakhamaysa/barber-frontend.git
```

Navigate to the project:

```bash
cd barber-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

---

## Available Scripts

### Start Development Server

```bash
npm start
```

Runs the application in development mode.

### Run Tests

```bash
npm test
```

Runs the test suite.

### Build for Production

```bash
npm run build
```

Creates an optimized production build.

---

## Environment Variables

The frontend uses environment variables for configuration such as the backend API URL.

Example:

```env
REACT_APP_API_URL=http://localhost:3000
```

Create a `.env` file in the project root and configure the required environment variables before running the application.

> Do not commit `.env` files containing sensitive information.

---

## Architecture

The frontend follows a layered and feature-oriented approach:

```text
                 React UI
                    │
                    ▼
              Components
                    │
                    ▼
                 Hooks
                    │
                    ▼
                Services
                    │
                    ▼
                 Axios
                    │
                    ▼
              Backend API
```

This separation helps keep UI components focused on presentation while application logic and API communication remain organized in their respective layers.

---

## Related Backend

The backend for this project is implemented as a separate RESTful API using Node.js, Express.js, TypeScript, and PostgreSQL.

It provides the server-side functionality required by the frontend.

---

## Future Improvements

Planned improvements include:

* Complete backend integration
* Advanced authentication handling
* Improved error handling
* Loading and empty states
* Form validation
* Improved accessibility
* More comprehensive frontend testing
* Production deployment
* Performance optimization
* Enhanced mobile experience

---

## Author

**Baraa Khamaysa**

Full Stack Web Developer

GitHub: [@engbaraakhamaysa](https://github.com/engbaraakhamaysa)

---

## License

This project is currently developed as a personal software project for learning, portfolio development, and practical application of full-stack web development concepts.
