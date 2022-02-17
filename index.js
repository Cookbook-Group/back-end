const express = require("express");
const app = express();
const session = require("express-session");
require("dotenv").config();

const SESSION_SECRET = process.env.SESSION_SECRET;
const PORT = process.env.PORT || 4004;
const helmet = require("helmet");
const morgan = require("morgan");
const {cloudinary} = require("./utils/cloudinary")

const cors = require("cors");
const passport = require("passport");
const passportSetup = require("./passport");
const cookieSession = require("cookie-session");

const postsController = require("./controllers/posts");
const authController = require("./controllers/auth");
const userController = require("./controllers/user");
const uploadsController = require("./controllers/uploads");

// const uploadImageController = require("./controllers/uploadImage")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: "session",
    keys: SESSION_SECRET,
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("common"));

app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/posts", postsController);
app.use("/auth", authController);
app.use("/users", userController);
app.use("/uploads", uploadsController)
// app.use("/load", uploadImageController)

app.listen(PORT, () => {
  console.log(`Posting recipes!✅ PORT: ${PORT} 🌟`);
});
