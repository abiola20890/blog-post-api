# Blog Post API

A simple RESTful API for managing blog posts using **Node.js**, **Express**, **MongoDB Atlas**, and **Joi** for request validation.

---

## Features

- Create, read, update, and delete blog posts (CRUD)  
- Search posts by title or content  
- Validates incoming requests with **Joi**  
- Uses **Mongoose** for MongoDB object modeling  
- Supports environment variables with **dotenv**  
- Automatically restarts on changes with **nodemon**  

---

## Tech Stack

- **Node.js** – Backend runtime  
- **Express.js** – Web framework  
- **MongoDB Atlas** – Cloud database  
- **Mongoose** – MongoDB object modeling  
- **Joi** – Request validation  
- **dotenv** – Environment variables  
- **nodemon** – Development server auto-reload  

---

## Prerequisites

- Node.js (v18 or above recommended)  
- npm  
- MongoDB Atlas account and cluster  

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/blog_post_api.git
cd blog_post_api

# Install dependencies
npm install

# Run the API in development
npm run dev

Create a .env file in the root directory:

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=5000

Replace <username>, <password>, and <dbname> with your MongoDB Atlas credentials.

# Run the API in development

npm run dev

The server will start on the port specified in .env (default 5000).

## API Endpoints

| Method | Endpoint               | Description                     |
|--------|-----------------------|---------------------------------|
| GET    | /articles             | Get all blog posts              |
| GET    | /articles/:id         | Get a single post by ID         |
| GET    | /articles/search      | Search posts by title/content   |
| POST   | /articles             | Create a new blog post          |
| PUT    | /articles/:id         | Update a blog post by ID        |
| DELETE | /articles/:id         | Delete a blog post by ID        |

## Folder Structure

blog_post_api/
├─ Src/
│  ├─ config/           # Database connection
│  ├─ controllers/      # Route controllers
│  ├─ models/           # Mongoose models
│  ├─ routes/           # Express routes
├─ .env                 # Environment variables
├─ index.js             # Entry point
├─ package.json
├─ README.md

## Contributing

- Fork the repo

- Create a feature branch (git checkout -b feature-name)

- Commit your changes (git commit -m "Add feature")

- Push to the branch (git push origin feature-name)

- Open a Pull Request

