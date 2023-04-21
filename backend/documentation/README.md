# Backend Documentation

The backend API is divided into four categories: `/doctor/`, `/patient/`, `/record/`, and `/token/`

## Doctor

- [Register](doctor/create.md): `POST /doctor/create`
- [Login](doctor/login.md): `POST /doctor/create`
- [Update](doctor/update.md): `POST /doctor/update`
- [View](doctor/view.md): `GET /doctor/view/:_id`
- [View Record list](doctor/list.md): `GET /doctor/list/:_id`

## Libraries Used

- Express.js
- Mongoose
- Websocket
- Bcrypt
- Cors
- Crypto
- Express-session
