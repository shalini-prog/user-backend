const express = require("express")
const dotenv = require("dotenv")
const {register,login} = require("./controllers/authController.js")
dotenv.config()
const dbConnect = require("./config/dbConnection.js")
const authRouter = require("./routes/authRouter.js")
const userRoutes = require("./routes/userRoutes.js")
const cookieParser = require("cookie-parser");
const cors = require("cors");




dbConnect()
const app = express()
app.use(cors({
    origin: true, // Dynamically reflects the request origin
    credentials: true
  }));
  
app.use(express.json())
app.use(cookieParser());
app.use("/api/auth",authRouter)
app.use("/api/users",userRoutes);
 // update path accordingly


const PORT = process.env.PORT || 7002
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})