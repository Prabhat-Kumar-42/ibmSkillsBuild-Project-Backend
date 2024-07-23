# API Documentation

## User Controller

### Endpoints

#### `/api/user`

- **DELETE**

  - Description: Deletes the requesting user.
  - Success Status: `204 No Content`
  - Failure Codes: `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`
  - Response Body:
    - Error Message: Details about the error encountered.

- **PUT**
  - Description: Updates the requesting user.
  - Success Status: `200 OK` (default unless specified otherwise)
  - Failure Codes: `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`
  - Response Body:
    - Success Message: updated.
    - Error Message: Details about the error encountered.

#### `/api/user/:id`

- **GET**
  - Description: Fetches the data of the user with the specified ID.
  - Success Status: `200 OK`
  - Failure Codes: `404 Not Found`, `500 Internal Server Error`
  - Response Body:
    - User data if found.
    - Error Message if user with the given ID does not exist.

#### `/api/user/login`

- **POST**
  - Description: Login endpoint; returns Bearer token on successful login.
  - Success Status: `200 OK`
  - Failure Codes: `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`
  - Response Body:
    - On successful login:
      - Success Message: success
      - Bearer token
    - Error Message if login fails.

#### `/api/user/signup`

- **POST**
  - Description: Signup endpoint; allows users to sign up.
  - Success Status: `201 Created`
  - Failure Codes: `400 Bad Request`, `500 Internal Server Error`
  - Response Body:
    - Success Message: created.
    - Error Message: Details about signup failure.

#### `/api/user/update-email`

- **PUT**
  - Description: Endpoint to update the requesting user's email.
  - Success Status: `200 OK`
  - Failure Codes: `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`
  - Response Body:
    - Success Message: updated.
    - Error Message: Details about the error encountered.

#### `/api/user/update-password`

- **PUT**
  - Description: Endpoint for the user to update their password.
  - Success Status: `204 No Content`
  - Failure Codes: `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`
  - Response Body:
    - Error Message: Details about the error encountered.

## TODOs

### User API

- Add email verification endpoint.
- Add phone number verification endpoint.

### Shop API

- To be defined.

### Item API

- To be defined.

### Cart API

- To be defined.

### Comment API

- To be defined.
