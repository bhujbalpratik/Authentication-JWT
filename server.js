import express from "express"
import userRouter from "./routers/user.router.js"
import ejs from "ejs"
import MongoConnection from "./config/mongoose.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import { isAuthenticated } from "./middlewares/Auth.js"

MongoConnection()

const app = express()

app.set("view engine", "ejs")
app.set("views", "./views")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/user", userRouter)

app.get("/", isAuthenticated, (req, res) => {
  return res.render("home")
})

app.listen(2500, () => {
  console.log("server working on http://localhost:2500")
})
