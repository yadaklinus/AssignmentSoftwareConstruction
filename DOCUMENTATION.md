# Software Development Process Documentation: NEU Gombe Survey Application

## 1. Project Overview
The NEU Gombe Survey Application is a specialized web platform designed for North Eastern University Gombe to collect student feedback on school restaurants ("Polygon" and "Ready-Rides"). It provides a public survey interface and a secured administrative dashboard for data analysis.

## 2. Design Phase
### 2.1 Requirements Analysis
- **Target Audience:** Students of NEU Gombe.
- **Core Features:**
  - Publicly accessible survey form (Gender, Department, Restaurant Choice, Reason).
  - Secure Admin Login (Password protection).
  - Admin Dashboard with data visualization (Charts and Tables).
  - 100+ response requirement for data validity.

### 2.2 UI/UX Design
- **Theme:** Blue primary color palette reflecting North Eastern University Gombe's identity.
- **Components:** Built using HeroUI for a modern, responsive, and accessible interface.
- **Responsiveness:** Optimized for both mobile and desktop users.

### 2.3 Database Design
- **ORM:** Prisma.
- **Database:** PostgreSQL.
- **Model:** `SurveyResponse`
  - `id`: Unique identifier (CUID).
  - `gender`: Student gender.
  - `department`: Academic department.
  - `restaurantChoice`: Preference (Polygon/Ready-Rides).
  - `reason`: Feedback text.
  - `createdAt`: Timestamp.

## 3. Development Phase
### 3.1 Tech Stack
- **Frontend:** Next.js 15 (App Router), Tailwind CSS 4, HeroUI.
- **Backend:** Next.js Server Actions, API Routes.
- **Database:** Prisma ORM with PostgreSQL.
- **Auth:** Simple cookie-based authentication with JWT (`jose`).
- **Charts:** `recharts` for data visualization.

### 3.2 Implementation Highlights
- **Server Actions:** Used for secure and efficient database operations.
- **Middleware:** Implemented to protect admin routes from unauthorized access.
- **Seed Script:** Automated data generation using `@faker-js/faker` to populate 110+ responses for development and testing.

## 4. Testing Phase
### 4.1 Functional Testing
- **Survey Submission:** Verified that data is correctly stored in the database and the success view is shown.
- **Validation:** Ensured all fields are required and properly validated on both client and server.
- **Authentication:** Tested login redirects and session persistence.

### 4.2 UI/UX Testing
- **Responsive Design:** Verified layout integrity on various screen sizes.
- **Theme Consistency:** Ensured the blue theme is applied consistently across all views.

## 5. Deployment Phase
### 5.1 Environment Setup
1. Configure `.env` with:
   - `DATABASE_URL`: PostgreSQL connection string.
   - `ADMIN_PASSWORD`: Secure password for the dashboard.
   - `JWT_SECRET`: Secret key for session tokens.
2. Run `npm install` to install dependencies.

### 5.2 Database Migration
- Run `npx prisma db push` to sync the schema with the live database.
- Run `npx prisma db seed` to populate initial data.

### 5.3 Build & Launch
- Execute `npm run build` to generate a production build.
- Execute `npm run start` to launch the application.

---
*Developed for North Eastern University Gombe*
