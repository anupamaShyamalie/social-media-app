const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./Routes/user");
const authRoute = require("./Routes/auth");
const postsRoute = require("./Routes/posts");
const conversationRoute = require("./Routes/conversation");
const messageRoute = require("./Routes/message");
const multer = require("multer");
const path = require("path");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db Connected...!"));

app.use("/images", express.static(path.join(__dirname, "public/images")));

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const fileName = req.query.name || file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully..!");
    console.log("uploaded");
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/messages",messageRoute);
app.use("/api/conversations",conversationRoute);


app.listen(8800, () => {
  console.log("backend server is running..!");
});
