# Shop Route

## Endpoints

### 1. Get All Shops

**Endpoint:** `GET /api/shop`

**Description:** Retrieves a list of all shops.

**Response:**
- **Status Code:** `200 OK`
- **Body:** JSON array containing details of all shops.


### 2. Create Shop
**Endpoint:** `POST /api/shop`

**Description:** Creates a new shop.

**Request Headers:**
- `Authorization`: Bearer token (required).

**Request Body:**
- `name` (String): The name of the shop.
- `owner` (String): The name of the shop owner.
- `items` (Array, Optional): A list of items available in the shop.

**Response:**
- Status Code: `201 Created`
- Body: JSON object with a message indicating successful creation.
- Error Responses:
  - `401 Unauthorized`: If the user is not authenticated.


### 3. Get Shop Details
**Endpoint:** `GET /api/shop/:shopId`

**Description:** Retrieves details of a specific shop by its ID.

**Request Parameters:**
- `shopId` (Path Parameter): The ID of the shop to retrieve.

**Response:**
- Status Code: `200 OK`
- Body: JSON object containing details of the shop.
- Error Responses:
  - `404 Not Found`: If the shop does not exist.


### 4. Update Shop
**Endpoint:** `PUT /api/shop/:shopId`

**Description:** Updates the details of a specific shop.

Request Headers:
- `Authorization`: Bearer token (required).

**Request Parameters:**
- `shopId` (Path Parameter): The ID of the shop to update.

**Request Body:**
- `name` (String, Optional): The new name of the shop.
- `owner` (String, Optional): The new name of the shop owner.
- `items` (Array, Optional): The updated list of items in the shop.

**Response:**
- Status Code: `200 OK`
- Body: JSON object with a message and updated shop details.
- Error Responses:
  - `401 Unauthorized`: If the user is not authenticated.
  - `404 Not Found`: If the shop does not exist.


### 5. Delete Shop
**Endpoint:** `DELETE /api/shop/:shopId`

**Description:** Deletes a shop by its ID.

**Request Headers:**
- `Authorization`: Bearer token (required).

Request Parameters:
- `shopId` (Path Parameter): The ID of the shop to delete.

**Response:**
- Status Code: `204 No Content`
- Error Responses:
  - `401 Unauthorized`: If the user is not authenticated.
  - `404 Not Found`: If the shop does not exist.


### 6. Add Item to Shop List
**Endpoint:** `PUT /api/shop/:shopId/addItem`

**Description:** Adds an item to the list of a specific shop.

**Request Headers:**
- `Authorization`: Bearer token (required).

**Request Parameters:**
- `shopId` (Path Parameter): The ID of the shop to update.

**Request Body:**
- `item` (String): The item to add to the shop's list.

**Response:**
- Status Code: `200 OK`
- Body: JSON object with a message and updated shop details.
- Error Responses:
  - `401 Unauthorized`: If the user is not authenticated.
  - `404 Not Found`: If the shop does not exist.
