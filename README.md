# Book Review API
Overview
This is a RESTful API built with Node.js and Express.js for a basic Book Review system. It includes user authentication, book management, and review functionalities.

   ## Tech Stack
  	Node.js
  	Express.js
  	MongoDB (DB)
  	JWT (JSON Web Tokens) for Authentication
## Features
	Authentication:
		User registration and login using JWT.
	Book Management:
		Add new books (protected).
		Retrieve all books with pagination and filtering.
		Retrieve a single book with details, average rating, and paginated reviews.
	Review Management:
		Submit reviews for books (protected, one review per user per book).
		Update/delete own reviews.
		Search
		Search books by title or author
## Database Schema	
### MongoDB Schema 
### 1. User Model
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});


module.exports = mongoose.model('User', userSchema);

### 2. Book Model
const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});


module.exports = mongoose.model('Book', bookSchema);

### 3. Review Model
const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: String
});


module.exports = mongoose.model('Review', reviewSchema);

# Project Setup 
Clone the repository:
Install dependencies:
npm install


## Set up environment variables:
In the .env file i created i just made MONGO_URI different change to your connection string after creating connection string from atlas
Run the application:
Node server.js

The server will start at http://localhost:3000 (or the port specified in your .env file).
## How to Run Locally
See "Project Setup Instructions" above.

## Example API Requests
### USE postman if not installed install
## 1. User Authentication
	Method: POST
	URL: http://localhost:3000/signup
	Headers: Content-Type: application/json
	Body:
	{
    	"username": "kozhi",
    	"email": "kozhi@gmail.com",
    	"password": "password123"
	}

### Response:
{
    	"token": "jwt_token"  // Copy token }


## 2. Book Management
### POST /books
	Method: POST
	URL: http://localhost:3000/books
	Headers:
	Content-Type: application/json
	Authorization: Bearer <token> (Replace <token>)
	Body:
		{
		    "title": "The Great Gatsby",
		    "author": "F. Scott Fitzgerald",
		    "genre": "Classic",
		    "description": "A novel about wealth, love, and the American Dream."
		}


### GET /books

Method: GET
	URL: http://localhost:3000/books?page=1&limit=10&author=Scott
	page: 1
	limit: 10
	author: Scott
### GET /books/:id
	Method: GET
	URL: http://localhost:3000/books/65e571e49b8b4b7d1c5e57a8 (Replace with a valid book ID)
### GET /search
	Method: GET
	URL: http://localhost:3000/search?query=Gatsby

## 3. Review Management
	POST /books/:id/reviews
	Method: POST
	URL: http://localhost:3000/books/65e571e49b8b4b7d1c5e57a8/reviews (Replace with a valid book ID)
	Headers:
	Content-Type: application/json
	Authorization: Bearer <your_jwt_token>
	Body:
	{
	    "rating": 5,
	    "comment": "A fantastic book!"
	}
	

### PUT /reviews/:id
	Method: PUT
	URL: http://localhost:3000/reviews/65e589f39b8b4b7d1c5e57b1
	Headers:
	Content-Type: application/json
	Authorization: Bearer <jwt_token>
	Body:
	{
	    "rating": 4,
	    "comment": "It was good"
	}


### DELETE /reviews/:id
	Method: DELETE
	URL: http://localhost:3000/reviews/65e589f39b8b4b7d1c5e57b1 (Replace with a valid review ID)
	Headers:
	Authorization: Bearer <jwt_token>


## Design Decisions & Assumptions
### Database
		We chose MongoDB because it handles JSON-like documents really well, which fits nicely with how most web APIs work. It also gives us flexibility when dealing with evolving data structures.
### Authentication
Authentication is handled using JWT (JSON Web Tokens). It’s stateless, so it scales better and is relatively simple to implement. Tokens can be stored on the client and sent with each request, making session management easier.

