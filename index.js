import express, { response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.port;
//MongoDB atlas database

mongoose.set("strictQuery", true); // This line is added to remove DeprecationWarning
//connecting to database

const main = async () => {
  mongoose.connect(
    `${process.env.base_url}`,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },

    () => {
      console.log("DB connected");
    }
  );
};
main();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

// Routes

app.get("/", (req, res) => {
  const usr = new User({
    name: "Suarabhdfdffd",
    email: "ssssseeeee ",
    password: "3333",
  });
  usr.save((err) => {
    if (err === 0) {
      res.send("err");
    } else {
      res.send("save");
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfull!", user: user });
      } else {
        res.send({ message: " Password Did not match." });
      }
    } else {
      res.send({ message: "user not registered" });
    }
  });
});

// This is all fine// setting the working of register button

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already regisetered" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });

      user.save((err) => {
        if (err) {
          res.send({ message: "err" });
        } else {
          res.send({ message: "Successfully registered! Please Login now" });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log("BE started at port 9005");
});
