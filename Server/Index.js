require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const { Pool } = require("pg");
const formData = require("express-form-data");
const cloudinary = require("cloudinary");
const {
  SERVER_PORT,
  SESSION_SECRET,
  ADMIN_SECRET,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
  CONNECTION_STRING,
} = process.env;
const {
  createPost,
  getSinglePost,
  getPosts,
  editPicture,
} = require("./queries/postCtrl.js");
const { login, register, logout } = require("./queries/authCtrl.js");
const { requestLogin } = require("./queries/emailCtrl.js");

app.use(formData.parse());
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 31556952000,
    },
  })
);

const pool = new Pool({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

app.post("/auth/register", register);
app.post("/auth/login", login);
app.delete("/auth/logout", logout);
app.post("/api/request-login", requestLogin);
app.get("/api/posts/:post_id", getSinglePost);
app.get("/api/posts", getPosts);
app.post(`/api/posts`, createPost);
app.post(`/api/posts/pictures`,editPicture)
app.use(express.static(__dirname + "/../build"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

pool
  .connect()
  .then(() => {
    app.listen(SERVER_PORT, () => {
      app.set("secret", ADMIN_SECRET);
      app.set("pool", pool);
      console.log(`ray rays day days freshly ported from ${SERVER_PORT}`);
    });
  })
  .catch((err) => console.log(err));
