# Simple CRUD Assignment

This application is a TypeScript-based CRUD (Create, Read, Update, Delete) application using Express, MongoDB, and Mongoose.

### Prerequisites

Before running the application, ensure you have the following installed in your work station:

- Node.js (preferably the latest LTS version)
- MongoDB installed and running on your local machine or a remote server
- Git (if cloning from a repository)

### Installation

1. Clone or download the repository from [https://github.com/mahabubsaki/l2a2.git].

`Clone a Repository:`
This command clones a repository from GitHub to your local machine.

```bash
   git clone https://github.com/mahabubsaki/l2a2.git
```

2. Navigate to the project directory in your terminal.

```bash
   cd l2a2
```

3. Install dependencies using npm (Node Package Manager).

```bash
   npm install
```

### Configuration

Create a `.env` file in the root directory of the project.

Add necessary environment variables to the `.env` file, such as:

`MONGODB_URI:` MongoDB connection URI.
Other necessary environment variables required for your application.
Example .env file:

```bash
MONGODB_URI=mongodb://localhost:27017/your_database_name
PORT=3000
```

### Running the Application

#### Development Mode

Start Development Server:
To run the application in development mode (with live reload):

```bash
   npm run dev
```

> The development server will start at http://localhost:3000 or the server port your local machine.

#### Production Mode

`Build for Production:`

To build the application for production:

```bash
    npm run build
```

`Start Production Server:`

To run the application in production mode:

```bash
    npm run start
```

#### Troubleshooting and FAQs

##### Troubleshooting

If you encounter any issues while running the application, try the following steps:

1. Make sure `MongoDB is running`.
2. Check if all dependencies are installed by running `npm install`.

#### My Server is Hosted on Vercel

You can also access the API from the following link:
[https://level2-assingment2.vercel.app/]

##### API Documentation

The API endpoints and their usages are documented below:

`User Management:`
`Create a new user`
Endpoint: POST /api/users`

`Retrieve a list of all users`
Endpoint: GET /api/users

`Retrieve a specific user by ID`
Endpoint: GET /api/users/:userId

`Update user information`
Endpoint: PUT /api/users/:userId

`Delete a user`
Endpoint: DELETE /api/users/:userId

`Order Management:`
`Add New Product in Order`
Endpoint: PUT /api/users/:userId/orders

`Retrieve all orders for a specific user`
Endpoint: GET /api/users/:userId/orders

`Calculate Total Price of Orders for a Specific User`
Endpoint: GET /api/users/:userId/orders/total-price
