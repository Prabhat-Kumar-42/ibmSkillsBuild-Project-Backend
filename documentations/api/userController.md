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
  - `400 Bad Request`: If `name`, `email`, or `password` are missing.


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
  - `400 Bad Request`: If `email` or `password` are missing or incorrect.


### 4. Delete User
**Endpoint:** `DELETE /api/user`

**Description:** Deletes a user account.

**Request Parameters:**
- `id` (String): The ID of the user to delete (from `req.user`).
- `email` (String): The email of the user (from `req.user`).
- `password` (String): The password of the user (from request body).

**Response:**
- Status Code: `204 No Content`
- Error Responses:
  - `400 Bad Request`: If `password` is incorrect.
  - `404 Not Found`: If the user does not exist.


### 5. Update User Details
**Endpoint:** `PUT /api/user`

**Description:** Updates user details.

**Request Body:**
- `name` (String): The new name of the user.
- `dob` (String, Optional): The new date of birth of the user.

**Response:**
- Status Code: `200 OK`
- Body: JSON object containing a message and updated user details.
- Error Responses:
  - `400 Bad Request`: If `name` is missing.
  - `404 Not Found`: If the user does not exist.

 
### 6. Update Password
**Endpoint:** `PUT /api/user/password`

**Description:** Updates the user password.

**Request Body:**
- `password` (String): The current password.
- `updatedPassword` (String): The new password.

**Response:**
- Status Code: `204 No Content`
- Error Responses:
  - `400 Bad Request`: If `password` or `updatedPassword` are missing or incorrect.


### 7. Update Email
**Endpoint:** `PUT /api/user/email`

**Description:** Updates the user email.

**Request Body:**
- `updatedEmail` (String): The new email.
- `password` (String): The current password.

**Response:**
- Status Code: `200 OK`
- Body: JSON object containing a message and updated user details.
- Error Responses:
  - `400 Bad Request`: If `updatedEmail` or `password` are missing or incorrect.



