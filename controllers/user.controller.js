import User from "../models/user.models.js";
import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";
export const userHome = (req, res) => {
  res.send("User Home");
};

export const registerGet = (req, res) => {
  res.render("register");
};
export const loginGet = (req, res) => {
  res.render("login");
};

export const registerPost = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcyrpt.hash(password, 10);
  console.log(hashedPassword);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });
  res.render("login", {
    title: "Login Page",
  });
};

export const loginPost = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  //   console.log(user);
  if (!user)
    return res.render("login", {
      msg: "User Not Found enter Valid Email Id",
    });

  const isMatch = await bcyrpt.compare(password, user.password);
  if (!isMatch)
    return res.render("login", {
      email,
      msg: "Password Incorrect",
    });

  const token = jwt.sign({ _id: user._id }, "heyheyhey");

  return res
    .cookie("token", token, {
      httpsOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .redirect("/");
};
export const logout = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  return res.redirect("/user/login");
};
export const getAccount = (req, res) => {
  return res.render("accounts", {
    user: req.user,
  });
};
