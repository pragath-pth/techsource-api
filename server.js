require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const userRoute = require("./routes/user.routes");
const appRoute = require("./routes/apps.routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:4200","https://pragathpth.me"],
    // credentials: true,
  })
);

app.use("/api/users", userRoute);
app.use("/api/apps", appRoute);

// Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});