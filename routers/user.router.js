import express from "express";
import {
  getAccount,
  loginGet,
  loginPost,
  logout,
  registerGet,
  registerPost,
  userHome,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/Auth.js";
// import { isAuthenticated } from "../server.js";

const router = express.Router();

router.get("/", userHome);
router.get("/register", registerGet);
router.post("/register", registerPost);
router.get("/login", loginGet);
router.post("/login", loginPost);
router.post("/logout", logout);
router.get("/account", isAuthenticated, getAccount);

export default router;
