## Shop Controller

### Endpoints

#### `/api/shop`

- **GET**

  - Description: Fetches the data of all shops in database.
  - Success Status: `200 OK`
  - Failure Codes: `500 Internal Server Error`
  - Response Body:
    - Error Message: Details about the error encountered.

- **POST**

  - Description: Endpoint for Creating Shop.
  - Success Status: `201 Created`
  - Failure Codes: `400 Bad Request`, `500 Internal Server Error`
  - Response Body:
    - Error Message: Details about the error encountered.

#### `/api/shop/:shodId`

- **GET**

  - Description: Fetches the data of the user with the specified ID.
  - Success Status: `200 OK`
  - Failure Codes: `404 Not Found`, `500 Internal Server Error`
  - Response Body:
    - User data if found.
    - Error Message if user with the given ID does not exist.

- **PUT**

  - Description: Endpoint to update the shop details.
  - Success Status: `200 OK`
  - Failure Codes: `400 Bad Request`,`403 Forbidden`, `404 Not Found`, `500 Internal Server Error`
  - Response Body:
    - Success Message: updated shop info.
    - Error Message: Details about the error encountered.

- **DELETE**

  - Description: Deletes the shop.
  - Success Status: `204 No Content`
  - Failure Codes: `400 Bad Request`, `403 Forbidden`,`404 Not Found`, `500 Internal Server Error`
  - Response Body:
    - Error Message: Details about the error encountered.

#### `/:shopId/addItems`

- **PUT**

  - Description: Endpoint to update items in shop inventory.
  - Success Status: `200 OK`
  - Failure Codes: `400 Bad Request`,`403 Forbidden`, `404 Not Found`, `500 Internal Server Error`
  - Response Body:
    - Success Message: updated shop info.
    - Error Message: Details about the error encountered.
