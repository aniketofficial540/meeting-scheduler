# Meeting Schedule API

Backend API for scheduling meetings with built-in time conflict prevention.

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Database:** MySQL
* **ORM:** Sequelize

## Setup & Installation

* **Clone the repository:** `git clone https://github.com/aniketofficial540/meeting-scheduler.git`
* **Install dependencies:** `npm install`
* **Environment Variables:** Create a `.env` file in the root directory.
  * `PORT=5000`
  * `DB_NAME=kraftshala_db`
  * `DB_USER=root`
  * `DB_PASSWORD=your_password`
  * `DB_HOST=localhost`
* **Database Setup:** Open MySQL and run `CREATE DATABASE kraftshala_db;`
* **Start the Server:** Run `npm run dev`

## Database Design Thinking

* **Users Table:**
  * `id` (Primary Key, Auto-increment)
  * `name` (String, Not Null)
  * `email` (String, Unique, Not Null)
  * `password` (String, Not Null)
* **Meetings Table:**
  * `id` (Primary Key, Auto-increment)
  * `userId` (Foreign Key - Users.id, Not Null)
  * `title` (String, Not Null)
  * `startTime` (Date, Not Null)
  * `endTime` (Date, Not Null)
* **Design Choices & Trade-offs:**
  * **Migrations:** Used `sequelize.sync` for rapid MVP development. In a production environment, I would use a dedicated migration runner (like `sequelize-cli`) for version control of database schemas.
  * **Conflict Logic:**  `existing.startTime < new.endTime AND existing.endTime > new.startTime`
  * **Timestamps:** Kept default `createdAt` and `updatedAt` columns for auditing purposes.

## API Endpoints

**User Routes**
* `POST /users` - Create a new user
* `GET /users` - List all users without showing the passwords

**Meeting Routes**
* `POST /meetings` - Schedule a meeting without overlapping
* `GET /meetings` - List meetings 
* `GET /meetings/:id` - Get a specific meeting by ID
* `PUT /meetings/:id` - Update a meeting (includes re-validation for time overlaps)
* `DELETE /meetings/:id` - Delete a meeting
