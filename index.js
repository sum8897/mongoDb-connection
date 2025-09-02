import express from "express";
import mongoose from "mongoose";
import ejs from "ejs";
import { User } from "./models/User.js";
import { userRegister } from "./controllers/user.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import { getCollectionModel } from "./views/generic.js";


dotenv.config({ path: path.resolve("environment.env") });
const app = express();


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// below url can get from compass like project -- : then copy connection string
mongoose
  .connect(
    "mongodb+srv://ashishchaurasiya611_db_user:uGFFNu5MSagp3Gzi@cluster0.qkw5wkv.mongodb.net/",
    { dbName: "NodeJsProject" }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch((error) => console.log("Server Error... " + error));


const uri = 'mongodb+srv://ashishchaurasiya611_db_user:uGFFNu5MSagp3Gzi@cluster0.qkw5wkv.mongodb.net/';
const dbName = 'NodeJsProject';
if (!uri) {
  throw new Error("MONGO_URI is undefined. Check your env file.");
}
const clientDB = new MongoClient(uri);
  async function getDbData(){
    //------------- using mongoos
  // try {
  //   const users = await User.find(); // fetch all data from User collection
  //   console.log("Users from DB:", users);
  // } catch (error) {
  //   console.error("Error fetching data:", error.message);
  // }
// ----------------Eneded 1 method-----------------------------
// 2.----------------------------------
  // try {
  //   const usersList = getCollectionModel("users"); // dynamic model
  //   const users = await usersList.find(); 
  //   console.log("Users (dynamic model):", users);
  // } catch (error) {
  //   console.error(error.message);
  // }
// -------------- Ended 2nd method-----------------


//-------------------below using mongoDB?
  try {
    await clientDB.connect();
    const db = clientDB.db(dbName);
    const collection = db.collection("users");

    const users = await collection.find({}).toArray();
    console.log("Users from DB:", users);
    return users; // yah krna pda const users = await getDbData(); 
    //  isme data bhejne ke liye .. usko naa krne pe undefiend mil rha tha
  } catch (error) {
    console.error("Error fetching data:", error.message);
  } finally {
    await clientDB.close();
  }
  // -------------------------------
  }
  getDbData();
app.get("/", (req, resp) => {
  //   resp.send("Home Page Loaded...");
  resp.render("index.ejs");
});

// app.post("/submit-form", async (req, resp) => {
//   console.log(req.body);
//   //   resp.json({
//   //     message: "Your form have been submitted successfully...",
//   //     success: true,
//   //     error: false,
//   //   });
//   try {
//     let user = await User.create(req.body);
//     resp.json({
//       message: "Your form have been submitted successfully...",
//       newUser: user,
//       success: true,
//       error: false,
//     });
//   } catch (error) {
//     req.json({
//       message: error.message,
//       status: false,
//       error: true,
//     });
//   }
// });


//above code commened hai due to userRegister , userRegister ek alg se controller bna lia
app.post("/submit-form", userRegister);
app.get('/apidata',async(req,resp)=>{
 try {
    const users = await getDbData();  // ✅ reuse helper
    console.log("Users from DB (via helper):", users);
    resp.render('apidata', { users });
  } catch (error) {
    console.error("Error in /apidata route:", error.message);
    resp.status(500).send("Error fetching users.");
  }

})
app.listen(3000);
