# Backend Documentation

The backend API is divided into four categories: `/doctor/`, `/patient/`, `/record/`, and `/token/`

## Doctor

- [Register](doctor/create.md): `POST /doctor/create`
- Login: `POST /doctor/create`
- Update: `POST /doctor/update`
- View: `GET /doctor/view/:_id`
- Record list: `GET /doctor/list/:_id`

## Libraries Used

- Express.js
- Mongoose
- Websocket
- Bcrypt
- Cors
- Crypto
- Express-session
