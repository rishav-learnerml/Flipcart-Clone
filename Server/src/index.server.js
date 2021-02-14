const express = require("express");
const env = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//routes
const userRoutes = require('./routes/user')
//envioronment constants
env.config();
//mongo db - mongodb+srv://Rishavuser:@Rishav182133#@cluster0.455k7.mongodb.net/Flipcart-Clone?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.455k7.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  .then((res) => {
    console.log("Database Connected...");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

//use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api',userRoutes);//every route will be prefixed with /api

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
