# TaskFlw - TypeScript Express API with Sequelize

## Overview

This is a backend API built using **TypeScript**, **Express.js**, and **Sequelize** (with PostgreSQL). It includes authentication with **JWT** and password hashing with **bcrypt**. The project follows a structured architecture and supports environment-based configurations.

## Features

-   **TypeScript support** for better type safety

-   **Express.js** for handling HTTP requests

-   **Sequelize ORM** for database interactions

-   **PostgreSQL** as the database

-   **JWT Authentication** for secure access (with refresh and access tokens)

-   **dotenv** for environment variable management

-   **bcrypt** for password hashing

-   **Celebrate (Joi-based)** for request validation

-   **Sequelize-CLI** for database migrations and models

-   **Cluster support** for scaling (optional)

-   **Task-Management-System-common** as a shared package for common types

## Installation

### Prerequisites

-   Node.js (>= 22)
-   PostgreSQL database
-   Yarn or NPM

### Setup

1. Clone the repository:

```sh
git clone https://github.com/KristiyanStefanov23/Task-Management-System.git
cd /server
```

2. Install dependencies:

```sh
yarn # or npm install
```

3. Create a `.env` file in the root directory and configure your environment variables:

## Environment Variables

Copy `.example.env` file in the root directory, rename it to `.env` and set the following variables:
| Variable | Description |
|--|--|
| `PORT` | Port on which the server runs |
| `JWT_SECRET` | Secret key for signing JWT access tokens |
| `JWT_REFRESH_SECRET` | Secret key for signing JWT refresh tokens |
| `SALT_ROUNDS` | Number of salt rounds for bcrypt password hashing |
| `DB_USER` | Database username |
| `DB_PASSWORD` | Database password |
| `DB_HOST` | Database host (e.g., localhost) || `DB_PORT` | Database port (default: 5432 for PostgreSQL) |
| `DB_NAME` | Name of the database |
| `DB_DIALECT` | Database dialect (e.g., postgres) |
| `MAX_WORKERS` | Maximum number of worker processes for clustering |

## Running the Application

### Development

```sh
yarn  dev  # Starts the server in watch mode

```

### Production

```sh
yarn  build  # Compiles TypeScript to JavaScript
yarn  run  postbuild  # adds package.json and prod modules
change  "type":  "module"  # in /dist/package.json
to  "type":  "commonjs"  # for production use
-  add  the  .env  to  /dist  root  # skip if using hosting service
yarn  start:prod  # Runs the production server with injected env
```

### Running with Clustering

Uncomment `createCluster(init)` instead of `init()` in `index.ts` to enable clustering for performance improvements.

## API Endpoints

### Authentication

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| POST   | `/auth/login`    | Log in user              |
| POST   | `/auth/register` | Register user            |
| GET    | `/auth/refresh`  | Refresh JWT token        |
| POST   | `/auth/logout`   | Log out user             |
| GET    | `/auth/me`       | Get current user details |

### Users

| Method | Endpoint | Description   |
| ------ | -------- | ------------- |
| GET    | `/users` | Get all users |

### Tasks

| Method | Endpoint       | Description                                   |
| ------ | -------------- | --------------------------------------------- |
| POST   | `/tasks`       | Create a new task                             |
| GET    | `/tasks`       | Get all tasks (requires authentication)       |
| GET    | `/tasks/:id`   | Get task by ID                                |
| PATCH  | `/tasks/:id`   | Edit task                                     |
| DELETE | `/tasks/:id`   | Delete task                                   |
| GET    | `/tasks/stats` | Get task statistics (requires authentication) |

## Technologies Used

-   **Express.js** (Web Framework)

-   **TypeScript** (Typed JavaScript)

-   **Sequelize** (ORM for PostgreSQL)

-   **bcrypt** (Password Hashing)

-   **jsonwebtoken** (JWT Authentication with refresh and access tokens)

-   **dotenv** (Environment Variables Management)

-   **Celebrate** (Request Validation)

-   **Cluster module** (Optional for multi-threaded performance)

-   **Task-Management-System-common** (Shared package for common types)
