import express from "express";
import mongoose from "mongoose";
const app = express();

// below url can get from compass like project -- : then copy connection string
mongoose
  .connect(
    "mongodb+srv://ashishchaurasiya611_db_user:2mlyrKv6S9IDrkRZ@cluster0.qkw5wkv.mongodb.net/",
  { dbName: "NodeJsProject" } 
  )
  .then(() => console.log("MongoDB connected..."))
  .catch((error) => console.log("Server Error... " + error));

app.get("/", (req, resp) => {
  resp.send("Home Page Loaded...");
});
app.listen(3000);
