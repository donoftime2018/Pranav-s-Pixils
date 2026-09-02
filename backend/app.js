require("dotenv").config();

const express = require("express");
const drawingRoutes = require("./routes/drawingRoutes");
const userAuthRoutes = require("./routes/userAuthRoutes")
const cors = require("cors");

const connectDB = require("./config/databaseConfig")

connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/fileUpload", drawingRoutes);
app.use(userAuthRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));