# User Route

## Endpoints

### 1. User Sign Up

**Endpoint:** `POST /api/user/signup`

**Description:** Creates a new user account.

**Request Body:**
- `name` (String): The name of the user.
- `email` (String): The email of the user.
- `password` (String): The password for the user account.

**Response:**
- **Status Code:** `201 Created`
- **Body:** JSON object with a message indicating successful creation.
- **Error Responses:**
  - `400 Bad Request`: If `name`, `email`, or `password` are missing.


### 2. User Login
**Endpoint:** `POST /api/user/login`

**Description:** Authenticates a user and returns an authorization token.

**Request Body:**
- `email` (String): The email of the user.
- `password` (String): The password of the user.

**Response:**
- **Status Code:** `200 OK`
- **Body:** JSON object containing a success message, authorization token, and user details.
- **Error Responses:**
  - `400 Bad Request`: If `email` or `password` are missing or incorrect.


### 3. Get User Details
**Endpoint:** `GET /api/user/:id`

**Description:** Retrieves details of a specific user by user ID.

**Request Parameters:**
- `id` (Path Parameter): The ID of the user to retrieve.

**Response:**
- **Status Code:** 200 OK
- **Body:** JSON object containing user details.
- **Error Responses:**
 - `404 Not Found`: If the user does not exist.

### 4. Update User Details
**Endpoint:** `PUT /api/user`

**Description:** Updates user details.

**Request Headers:**
- `Authorization`: Bearer token (required).

**Request Body:**
- `name` (String): The new name of the user.
- `dob` (String, Optional): The new date of birth of the user.

**Response:**
- **Status Code:** `200 OK`
- **Body:** JSON object with a message and updated user details.
- **Error Responses:**
 - `401 Unauthorized`: If the user is not authenticated.
 - `404 Not Found`: If the user does not exist.

### 5. Delete User
**Endpoint:** `DELETE /api/user`

**Description:** Deletes the current user account.

**Request Headers:**
- `Authorization`: Bearer token (required).

**Request Body:**
- `password` (String): The password of the user.

**Response:**
- **Status Code:** `204 No Content`
- **Error Responses:**
 - `401 Unauthorized`: If the user is not authenticated.
 - `400 Bad Request`: If the `password` is incorrect.


### 6. Update Password
**Endpoint:** `PUT /api/user/update-password`

**Description:** Updates the user's password.

**Request Headers:**
- `Authorization`: Bearer token (required).

**Request Body:**
- `password` (String): The current password.
- `updatedPassword` (String): The new password.

**Response:**
- **Status Code:** `204 No Content`
- **Error Responses:**
 - `400 Bad Request`: If `password` or `updatedPassword` are missing or incorrect.
 - `401 Unauthorized`: If the user is not authenticated.


### 7. Update Email
**Endpoint:** `PUT /api/user/update-email`

**Description:** Updates the user's email address.

**Request Headers:**
- `Authorization`: Bearer token (required).

**Request Body:**
- `updatedEmail` (String): The new email address.
- `password` (String): The current password.

**Response:**
- **Status Code:** `200 OK`
- **Body:** JSON object containing a message and updated user details.
- **Error Responses:**
 - `400 Bad Request`: If `updatedEmail` or `password` are missing or incorrect.
 - `401 Unauthorized`: If the user is not authenticated.
