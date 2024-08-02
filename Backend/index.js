const express = require("express");
const app= express();
const cors = require('cors');
const dotenv= require("dotenv")
const MongoDB = require("./config/db");
const authRoute = require("./routes/AuthRoute");
const adminRoute = require("./routes/AdminRoute");
const userRoute = require("./routes/UserRoute");


dotenv.config()

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "https://task-menucard-frontend.vercel.app", // Allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    credentials: true // Allow credentials if needed
  }));

  app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json("hello");
});
app.options('*', cors());

app.use("/api/auth",authRoute)
app.use("/api/admin",adminRoute)
app.use("/api/user",userRoute)


MongoDB();

const PORT = process.env.PORT||8080;
app.listen(PORT,()=>{
console.log(`conected localhost/:${PORT}`);
})