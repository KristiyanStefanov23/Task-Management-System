# TaskFlow - Frontend

## Overview

TaskFlow is an intuitive task management web application built with **Next.js**, **TypeScript**, and **React**. It is designed to help teams and individuals efficiently manage tasks, track progress, and collaborate effectively.

## Technologies Used

-   **Next.js 15.1.6** - Framework for server-side rendering and static site generation.
-   **TypeScript** - Enhances JavaScript with static typing.
-   **React 19.0.0** - Component-based UI library.
-   **React Query (@tanstack/react-query 5.66.0)** - Efficient server state management.
-   **Axios 1.7.9** - HTTP client for API requests.
-   **Styled Components 6.1.15** - Styling solution for components.
-   **React Feather 2.0.10** - Lightweight icon library.
-   **Cookie 1.0.2** - Utility for handling cookies.
-   **ESLint** - Code quality and linting.

## Authentication and Authorization

-   Only `/login` and `/register` are accessible without a valid access token.
-   Middleware redirects unauthorized users to the login page.
-   Users with an access token are redirected to the dashboard.

### `useAuth.ts` (Authentication Hook)

-   Handles login, registration, and logout using **React Query**.
-   Fetches user data and manages authentication state.

### `userContext.tsx` (User Context)

-   Stores user data globally within the app.
-   Provides functions to fetch user details and handle logout.

## API Handling

### `utils/api.ts`

-   Centralized API instance using **Axios**.
-   Implements an interceptor to automatically refresh access tokens if needed.
-   Provides functions for task management:
    -   `fetchAllTasks` - Retrieve all tasks.
    -   `getTask(id)` - Get task by ID.
    -   `editTask(data)` - Edit a task.
    -   `deleteTask(id)` - Delete a task.
    -   `fetchAllUsers` - Get all users.
    -   `createTask(data)` - Create a new task.
    -   `fetchTaskAnalytics()` - Fetch task analytics.

## Middleware

Handles route protection and authentication state management.

```typescript
import { NextRequest, NextResponse } from 'next/server'

const authRoutes = ['/register', '/login']

export function middleware(req: NextRequest) {
	const token = req.cookies.get('refresh-token')

	if (!token && !authRoutes.includes(req.nextUrl.pathname)) {
		return NextResponse.redirect(new URL('/login', req.url))
	}

	if (token && authRoutes.includes(req.nextUrl.pathname)) {
		return NextResponse.redirect(new URL('/dashboard', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/create-task/:path*', '/edit-task/:path*'],
}
```

-   Redirects unauthorized users attempting to access protected routes.
-   Prevents authenticated users from accessing `/login` and `/register`.

## Layout & Styling

### `layout.tsx`

-   Root layout uses **Styled Components** for global styles.
-   Integrates **React Query** and **UserProvider** for state management.

### Styling

-   The project utilizes **Styled Components** for styling across all pages and components.

## Features

✅ User Authentication (Login, Register, Logout)
✅ Task Management (CRUD operations)
✅ Global State Management with Context API & React Query
✅ API Integration with Token Interception
❌ Analytics Page (Not Implemented)

## Running the Project

### Prerequisites

-   Node.js & npm/yarn installed.
-   Backend API running at `API_BASE_URL` (set in `.env`).

### Installation & Setup

```sh
git clone https://github.com/KristiyanStefanov23/Task-Management-System.git
cd /client
yarn  # or npm  install
```

### Development

```sh
yarn run dev  # Start development server
```

### Build & Deploy

```sh
yarn run build  # Build for production
yarn start      # Start production server
```

---

**TaskFlow** - Smart Task Management & Collaboration 🚀
