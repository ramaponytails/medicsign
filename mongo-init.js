db.createUser({
  user: "ramaponytails",
  pwd: "ahlibesar",
  roles: [
    {
      role: "readWrite",
      db: "db",
    },
  ],
});
