## User Controller

### Endpoints

#### `/api/user`

### 1. Get User Details

**Endpoint:** `GET /api/user/:id`

**Description:** Retrieves user details by user ID.

**Request Parameters:**
- `id` (Path Parameter): The ID of the user to retrieve.

**Response:**
- Status Code: `200 OK`
- Body: JSON object containing user details.
- Error Responses: 
  - `404 Not Found`: If the user does not exist.

### 2. User Sign Up
**Endpoint:** `POST /api/user/signup`

**Description:** Creates a new user account.

**Request Body:**
- `name` (String): The name of the user.
- `email` (String): The email of the user.
- `password` (String): The password for the user account.

**Response:**
- Status Code: `201 Created`
- Body: JSON object with a message indicating successful creation.
- Error Responses:
  - `400 Bad Request`: If name, email, or password are missing.

### 3. User Login
**Endpoint:** `POST /api/user/login`

**Description:** Authenticates a user and returns an authorization token.

**Request Body:**
- `email` (String): The email of the user.
- `password` (String): The password of the user.

**Response:**
- Status Code: `200 OK`
- Body: JSON object containing a success message, authorization token, and user details.
- Error Responses:
  - `400 Bad Request`: If email or password are missing or incorrect.
