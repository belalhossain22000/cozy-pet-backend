# Live URL

https://inventory-management-backend-ruby.vercel.app/

## Description

Welcome to the Pet Adoption Platform! This platform provides a seamless experience for pet lovers to adopt pets and for shelters to manage pet profiles and adoption requests.
## Features

- **Authentication**:

  - User Registration and Login with JWT (JSON Web Tokens) for secure authentication.

- **Features**:

  - User Registration and Login: Users can register for an account and log in securely using JWT authentication.
  - Add and Update Pet Profiles: Shelters can add new pets to the platform, complete with detailed profiles, and update existing pet profiles as needed.
  - Browse and Filter Pets: Users can browse available pets, filtering by species, breed, age, size, and location.
  - Submit and Manage Adoption Requests: Users can submit adoption requests for pets they are interested in, and shelters can manage these requests, updating their status as needed.
  - User Profile Management: Users can view and update their profile information, including name and email.

- **Technology Used**:
  - Programming Language: TypeScript
  - Web Framework: Express.js
  - Object Relational Mapping (ORM): Prisma with PostgreSQL
  - Authentication: JWT (JSON Web Tokens)
  - Web Framework: Express.js



## Setup Instructions
### To set up the Pet Adoption Platform locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/assaignment-5-backend.git
   ```

1. **Install dependencies:**

   ```bash
   cd assaignment-8
    npm install
   ```

1. **Set up your PostgreSQL database and update the connection details in the .env file.**
   - Create a .env file in the root directory.
   - Add the following environment variables:
  
1. **Run database migrations:**

   ```bash
   npx prisma migrate dev

   ```
2. **Start the server:**

   ```bash
  npm start

   ```

## API Documentation

### Authentication

- `POST /api/register`: Register a new user.

  - **Request Body:**

    ````json
    {
    "username": "john_doe",
    "email": "john.doe@example.com",
    "password": "hashed_password",
    
    }

        ```
    ````

- `POST /api/login`: Login with existing user credentials.
  - **Request Body:**
    ```json
    {
       "email": "john.doe@example.com",
      "password": "password"
    }
    ```

### Pet Endpoints

- Add Pet: POST /api/pets

- Get Paginated and Filtered Pets: GET /api/pets

- `Update Pet Profile: PUT /api/pets/:petId.



### Adoption Request Endpoints

- Submit Adoption Request: POST /api/adoption-request

- Get Adoption Requests: GET /api/adoption-requests
- Update Adoption Request Status: PUT /api/adoption-requests/:requestId

 

 ## Error Handling  

  ** The application implements proper error handling throughout, providing detailed error messages and appropriate status codes for various scenarios.
