# View Record List

Used to view the record list of an existing doctor account.

**URL**: `/doctor/list/:_id`

**Method**: `GET`

**Auth required**: YES

## Success Response

**Code**: `200 OK`

### Body

- **success** `(bool)` &mdash; Whether the request was successful.
- **data**? `(object)` &mdash; If successful, the requested data:
  - **records** `(object[])` &mdash; The record list:
    - **\_id** `(string)` &mdash; The id of the record.
    - **patient_id** `(string)` &mdash; Id of the patient.
    - **doctor_id** `(string)` &mdash; Id of the doctor.
    - **disease** `(string)` &mdash; The disease of the record.
    - **diagnosis** `(string)` &mdash; Diagnosis detail for the disease.
    - **created_at** `(string)` &mdash; Date of creation of the record. (ISO 8601 format)
    - **signature** `(string)` &mdash; THe digital signature of the record.

### Example

```json
{
  "success": true,
  "data": {
    "records": [
      {
        "_id": "6440bbb238d52969548e0c43",
        "patient_id": "6440bb7638d52969548e0c38",
        "doctor_id": "6440bb2d38d52969548e0c2f",
        "disease": "COVID-19",
        "diagnosis": "Mild symptoms. No need for hospitalization.",
        "created_at": "2023-04-20T04:12:34.320Z",
        "signature": "OXRV53LR7lAUeJ2wKOW60mybiut9TIWNgT9UsPICoNool1YGZDrSFrNFjQkvKpahY9Qnn/gdQvejYdIEX3G7lN9jV91BJV5GdK4d6VmxeMvrimVr4dxuIIep9kNPHe2dwShVGz2QZFb3+hw9PSKnNV9of298F3aw+ixp86hvxOmGeSGM5zuLRN07kvDt8zw/uKPQIwku5KJEjBpkpxfdOqDEbsAC3mXrTEXHMF0lzGA15huSp2bgLKgbPnXvQwwiycRE9ky7BnuF0jhle/hl8w/iVWW4R4zDFuAXKXgMa4Pg7gh+Hy+5J611a64nAPSp1OjG4+Elzss8D9PaJ9x/dw=="
      },
      {
        "_id": "6440bbd938d52969548e0c52",
        "patient_id": "6440bb7638d52969548e0c38",
        "doctor_id": "6440bb2d38d52969548e0c2f",
        "disease": "Pneumonia",
        "diagnosis": "In need of immediate hospitalization.",
        "created_at": "2023-04-20T04:13:12.592Z",
        "signature": "l1JxXr7+DmyF8sFweT1Gp2+zSHZiB7jkNElwbGaptUAYNZsTPNwTSVm42U4yUcH1z3oO3DZcNEQo1C+hLFR2NiVC0S2UNyiy7CaZlhzgEWF9Jy+SjXqAT0AyC1RozdzPHsauXg/1cDsJNpLxwIEudKj0qSZVnMVJwDN0VXbBQF5c1eCE1Il5mUKEotc5ROWPX33DU9Z2mll7qOlb+Jr7/gEjQSjfO2yEvQRzdR4RA4fy1ykhzcb346pWBuPzO57vxKS/QkfW3F1CnB3iUgKIUVwJhLRruqL7OqoBzj00EDyemBmjqFGYJzQz6HsFb4b6wnOgc/HvwO3nF+li9Ymp9w=="
      },
      {
        "_id": "6440bc1638d52969548e0c72",
        "patient_id": "6440bbf838d52969548e0c67",
        "doctor_id": "6440bb2d38d52969548e0c2f",
        "disease": "Diarrhea",
        "diagnosis": "Food poisoning.",
        "created_at": "2023-04-20T04:14:14.299Z",
        "signature": "S6oBba2/5s2tAMzOXneuACl9Sb6D/rWfhHeZEQGGIBItW3J8iVaH19cdwDTsMEVmuo+SHvi88CnG9qxuj8WVJ4Ro7/xcuC8cDuY3iQV63M50QTTxCVgwAnoQO1vZCOshMWjChQF283RpLYO0sa8ZYQWAAYtFsq+Vf85pHgTffjHLrK48bxqZse2WAC4wJtTSaDMNkjk7SiR6GYtMIcp2l3T4YgUONFPGmvCatX6GWBO5fSqg5NOJXT8AW9Elx6zvZD/6eRae+UnuXQBcd0j0a3ha+15UC0xTCntCLOoy33LZZUTCfIU+O3ymiTssO6GaT2xFTMQa5n8BtqIMmYfpAw=="
      }
    ]
  }
}
```

# Error Response

| **Condition**                        | **Code**                    | **Message**        |
| ------------------------------------ | --------------------------- | ------------------ |
| Incomplete/incorrect data sent       | `400 BAD REQUEST`           | `Incomplete data.` |
| Invalid auth                         | `401 UNAUTHORIZED`          |                    |
| Email provided is already registered | `409 CONFLICT`              | `User exists.`     |
| Internal error                       | `500 INTERNAL SERVER ERROR` |
