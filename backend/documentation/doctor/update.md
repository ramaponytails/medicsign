# Register

Used to update an existing doctor account.

**URL**: `/doctor/update`

**Method**: `POST`

**Auth required**: YES

## Body

### Constraints

- **user** `(object)` &mdash; The updated doctor:
  - **\_id** `(string)` &mdash; The doctor's user id.
  - **email** `(string)` &mdash; The new email.
  - **name** `(string)` &mdash; The new name.
  - **hospital** `(string)` &mdash; The new Hospital name where doctor is working.
  - **password** `(string)` &mdash; The new password

### Example

```json
{
  "user": {
    "_id": "644142f5a7764388588b0859",
    "email": "email@example.com",
    "name": "John Smith",
    "hospital": "Rama Ponytails",
    "password": "securepassword1234"
  }
}
```

## Success Response

**Code**: `200 OK`

### Body

- **success** `(bool)` &mdash; Whether the request was successful.
- **data**? `(object)` &mdash; If successful, the updated data:
  - **user** `(object)` &mdash; The updated doctor:
    - **\_id** `(string)` &mdash; The doctor's user id.
    - **email** `(string)` &mdash; The new email.
    - **name** `(string)` &mdash; The new name.
    - **hospital** `(string)` &mdash; Hospital name where doctor is working.
    - **password** `(string)` &mdash; The new password (hashed).

### Example

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "644142f5a7764388588b0859",
      "email": "email@example.com",
      "name": "John Smith",
      "hospital": "Rama Ponytails",
      "password": "hashed_password"
    }
  }
}
```

# Error Response

| **Condition**                        | **Code**                    | **Message**        |
| ------------------------------------ | --------------------------- | ------------------ |
| Incomplete/incorrect data sent       | `400 BAD REQUEST`           | `Incomplete data.` |
| Email provided is already registered | `409 CONFLICT`              | `User exists.`     |
| Internal error                       | `500 INTERNAL SERVER ERROR` |
