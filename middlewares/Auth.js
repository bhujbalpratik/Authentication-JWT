import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(token, "heyheyhey");
    console.log(decoded);

    req.user = await User.findById(decoded._id);
    console.log("my userr is", req.user);
    console.log("cookie present");

    next();
  } else {
    console.log("cookie absent");
    return res.redirect("/user/login");
  }
};
