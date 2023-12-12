import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { customCors } from "./middlewares/cors.js";

import router from "./routes/index.js";

dotenv.config();
const app = express();


//app.use(express.json);
app.use(customCors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/* ROUTES */
app.use("/api", router);



const PORT = 3000;
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true,})
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on the port : ${PORT}` ));

  })
  .catch((error) => console.log(error));



