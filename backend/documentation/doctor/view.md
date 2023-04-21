# View

Used to view the details of an existing doctor account.

**URL**: `/doctor/view/:_id`

**Method**: `GET`

**Auth required**: NO

## Success Response

**Code**: `200 OK`

### Body

- **success** `(bool)` &mdash; Whether the request was successful.
- **data**? `(object)` &mdash; If successful, the requested data:
  - **user** `(object)` &mdash; The account details:
    - **name** `(string)` &mdash; The doctor's name.
    - **hospital** `(string)` &mdash; Hospital name where doctor is working.
    - **public_key** `(string)` &mdash; The doctor's public key in `base64`. (`spki` `der` format)

### Example

```json
{
  "success": true,
  "data": {
    "user": {
      "name": "John Smith",
      "hospital": "Rama Ponytails",
      "public_key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuMmfMjB40MMPrALQ9yg/xroAX4HYBfbi4HybfStrssKiRZuMebepgNfpVCvNoZ/b4mVJH+y4Y9F3QSE4X1zMBOkNRyco84WkgnaTrlVMKyBBrM9qaAuSYWYtfMM1YCS3LKfnZhbxBKF1Iybp1tS8XCBrFNCKDrFS/sFOtY2c7v59611RUCcuiXYuWVdkjtofZb7+mqiKoXZf6iwMmaF01H9xQ34tAteh/a7lMF8ov9ejHttbOSnCPaZrpUDDzIWbsUgFpHjJjTUC6kwuQIFnIfuRONCSGTZOUukhHmPbAjlNsKlxrPbsaTSSKDR1jKqUEUqXnRhdf1xAiK30MEoDtQIDAQAB"
    }
  }
}
```

# Error Response

| **Condition**       | **Code**                    | **Message**       |
| ------------------- | --------------------------- | ----------------- |
| Invalid `_id` given | `404 NOT FOUND`             | `Invalid userId.` |
| Internal error      | `500 INTERNAL SERVER ERROR` |
