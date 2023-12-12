import express from "express";
import bodyParser from "body-parser";
import initWebRoute from "./routes/web";
import * as connectDB from "./config/connectDB";
import Cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();

let app = express();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", `https://ecommerce-v2-fe.vercel.app/`);
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   next();
// });
app.use(Cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

initWebRoute(app);

connectDB.connectDB();

let port = process.env.PORT || 8080;
//nếu port undefined thì sẽ lấy giá trị là 8000

app.listen(port, () => {
  //callback
  console.log(`Backend NodeJS is running on the port: ${port}`);
});
