# Book Collection Management API

This project is a RESTful API for managing a collection of books. The API allows users to add books, view a list of books, update book information, and delete books. Additionally, the API includes user management and role-based access control using JWT authentication.

## Features

1. **Book Management:**
   - Add a new book (Admin only)
   - View all books
   - View a book by ID
   - Update book information (Admin only)
   - Delete a book (Admin only)

2. **User Management:**
   - Register a new user
   - Authenticate a user and obtain a JWT token
   - View current user information
   - Update user role (Admin only)

## Requirements

- Node.js
- MongoDB

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/book-collection-api.git
   cd book-collection-api
2. Install the dependencies:
npm install
3. Create a .env file in the root directory and add the following variables:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
4. Start the server:

npm start

### Usage
Endpoints
1. User Management
- Register a new user

Method: POST
URL: /users/register

- Authenticate a user

Method: POST
URL: /users/login

- Get current user information

Method: GET
URL: /users/me
Headers:
Authorization: Bearer <token>

- Update user role (Admin only)

Method: PUT
URL: /users/:id/role
Body: JSON
Headers:
Authorization: Bearer <token>

2. Book Management
- Add a new book (Admin only)

Method: POST
URL: /books

Headers:
Authorization: Bearer <token>
- View all books

Method: GET
URL: /books
- View a book by ID

Method: GET
URL: /books/:id
- Update book information (Admin only)

Method: PUT
URL: /books/:id

Headers:
Authorization: Bearer <token>
- Delete a book (Admin only)

Method: DELETE
URL: /books/:id
Headers:
Authorization: Bearer <token>
