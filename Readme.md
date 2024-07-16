# Blog System  
## Credentials

Admin account  
Email: admin@mail.com  
Password: admin123

Standard Account  
Email: wanderlustscribe@mail.com  
Password: user1234

## Objective: ExpressJS API - Inventory Management System

### 1. What is the main objective of the project?
	- ExpressJS API - blog System with Simple post CRUD functionalities and commenting functionalities

### 2. Who are the target users of the application?
	- Bloggers and blog readers

### 3. What are the core features or functionalities required?

	- User Registration and Authentication.
		- Register a user with a username and email
		- Login functionality
		- Get details of user
	- Basic CRUD operations for managing blog post (Create, Read, Update, Delete).
		- All users ability to retrieve all blog posts.
        - all users ability to retrieve a single blog post.
		- Authenticated user ability to create a new post.
		- Authenticated user to update their own existing post.
		- Authenticated user to delete their own post.
		- Admin users ability to delete post.
    - Comment functionalities
		- All user ability to view all comment
        - Authenticated user ability to add a comments.
        - Admin users ability to delete any comment

### 4. What data will the application need to store and manage?

	- User information 
		- username
        - email
		- password

	- Movie
		- title
		- content
        - author
		- comments
		- dateCreated
	
	- Comments
		- content
		- author
		- blog
		- dateCreated

### 5. Are there any specific technical requirements or constraints?

	- Express.js API.
	- MongoDB with Mongoose for data storage and management.
	- RESTful Architecture.

### 6. What are the security and authentication requirements?

	- Token-based Authentication (JWT).
	- Brcypt hash

### 7. What are your routes and controllers?

	Routes:

	User Routes

	POST /users/login - User login route.
	POST /users/register - User registration route.
	GET / users/details - Get information for a certail user

	Blog Routes:

	POST /blogs/ - Add a new blog post.
    GET /blogs/ - Retrieve a list of all blog post.
	GET /blogs/:postId - Retrieve a specific blog post by its ID.
	PATCH /blogs/:postId - Update an existing blog post by its ID.
	DELETE /blogs/:postId - Delete a blog post by its ID.

	Comments Route

    PATCH /comments/:postId - Add a comment to a blog post by its ID
    GET /comments/:postId - get all comments of a blog post by its ID
	DELETE /comments/:commentId - Delete a comment by its comment ID

	Controllers:

	User Controller:

	registerUser
	loginUser
	getProfile

	Blog Controller:

	addPost
	getAllPosts
	getSinglePost
	updatePost
	deletePost

	Comment Controller:

	addComment
	getComments
	deleteComment