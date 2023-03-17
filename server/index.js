import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import helmet from "helmet";
import morgan from "morgan";
//OPEN AI configuration
import { Configuration, OpenAIApi } from "openai";

import openAiRoutes from "./routes/openai.js";
import authRoutes from "./routes/auth.js";

//configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
// helmet.crossOriginResourcePolicy  is an denied access from diffrent server
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
// 👆In Node.js, the bodyParser.json({limit:"30mb", extended:true}) middleware function is used to parse incoming JSON requests. It is typically used in an Express.js application to extract the JSON payload from the HTTP request body and make it available in the req.body object

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// In Node.js, the bodyParser.urlencoded({ limit: "30mb", extended: true }) middleware function is used to parse incoming URL-encoded form data. It is typically used in an Express.js application to extract the form data from the HTTP request body and make it available in the req.body object.👆
app.use(cors());

//OPEN AI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

//ROUTER
app.use("/openai", openAiRoutes);
app.use("/auth", authRoutes);

//making request with express
const PORT = process.env.PORT || 9000; // const PORT =process.env.PORT < this is calling from .evc file > || 9000 <if env not work the use 9000 port>;
app.listen(PORT, () => {
  console.log(`the server is listening http:/localhost:${PORT}   `);
});
