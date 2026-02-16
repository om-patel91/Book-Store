import express from "express"
import mongoose from "mongoose";
import {PORT, mongodbURL} from "./config.js"
import booksRoute from "./routes/booksRoute.js"
const app = express();
import cors from "cors";

app.use(express.json());

//Middle ware for handling CORS policy
//option 1: Allow All origins with Default of cors(*)
//app.use(cors());
//option 2:Allow Custom Origins
app.use(cors({
      origin: "http://localhost:5173",
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.use("/books",booksRoute);

app.get("/",(req,res)=>{
    console.log(req);
    return res.status(200).send("hello world");
})



mongoose.connect(mongodbURL).then(() => {
  console.log('App connected to databse');
  app.listen(PORT, () =>{
    console.log(`server is listening to port:${PORT}`)
}) 
}).catch((error) => {
    console.log(error);
})