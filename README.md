[website live](https://aptoslauncher-assistant.aptoslauncher.tech/)



# packages

1. [creating react app](npm create-create-react-app) then (npm i)

2. [react redux i ] (npm i react-redux @reduxjs/toolkit)

3. all the packages like (@heroicons/react =>'for icons' react-router-dom react-dropzone =>'this is use to drop file in chat box' react-chat-engine-advanced )
4. for scss (npm install --save-dev sass)

# chat engine installation

go to (https://chatengine.io/) it need 7$ per/m, promo code 'edward'
go to user and create new user  
secret kry 007Ox
now creating .env.local
now grabing chat id from chatengine website

# here i am going to install eslint for better understanding of errors in code (npm i -D eslint eslint-config-react-app)

using esLint we have to install EsLint extinsion and we also have to create (.eslintrc.json) folder in client
add code in .eslintec.json folder

 <!-- {
  "extends": "react-app"
} -->

# now installing package for adding links in import from to look not messey (npm i -D @types/node)

import the above install script in vite.config.js file

<!-- import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
}); -->

then create file jsconfig.json
add the code in above file

<!-- {
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
} -->

// go to heroicons.com to check icon from "@heroicons/react/24/solid"
// above 24 is size of icon and solid is solid color

# i am coming to server

in server folder use (npm init -y) -y => is use to give default yes to all the prompts

# now i am installing packages for server

#<>> is module use in terminal
now i am installing <express>> EXPRESS in terminal then <body-parser>> to parse body <cors>> cross origan sharing In Node.js, the cors module is used to enable Cross-Origin Resource Sharing (CORS) on an Express.js application. CORS is a security feature implemented in web browsers that restricts web pages from making requests to a different domain than the one that served the original web page.

<helmet>> is use for Api security
<dotenv>> to grab enviromental value
<morgan>> The morgan module can be useful for debugging, monitoring, and analyzing web application traffic. It can help you identify slow or problematic routes, track the usage of your API, and troubleshoot issues.

# old module explain

npm i express body-parser => (its is use to grab request) cors dotenv helmet =>(make api secure) morgan =>(allow any time api called it get information )

then i am adding "type":"module", just after main key value pair

add the code in package.json "dev":"nodemon index.js" then install nodemon (npm i -D nodemon)

here i made .env file where i put" port address" and "Open api"

# importing in index .js till 1:20

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import helmet from "helmet";
import morgan from "morgan";

//configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
// helmet.crossOriginResourcePolicy is an denied access from diffrent server
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
// 👆In Node.js, the bodyParser.json({limit:"30mb", extended:true}) middleware function is used to parse incoming JSON requests. It is typically used in an Express.js application to extract the JSON payload from the HTTP request body and make it available in the req.body object

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// In Node.js, the bodyParser.urlencoded({ limit: "30mb", extended: true }) middleware function is used to parse incoming URL-encoded form data. It is typically used in an Express.js application to extract the form data from the HTTP request body and make it available in the req.body object.👆
app.use(cors());

//making request with express
const PORT = process.env.PORT || 9000; // const PORT =process.env.PORT < this is calling from .evc file > || 9000 <if env not work the use 9000 port>;
app.listen(PORT, () => {
console.log(`the server is listening http:/localhost:${PORT}   `);
});

# connecting to OPEN ai

[link for open ai npm](https://github.com/openai/openai-node)

<npm install openai>> installing npm module

copy code from link aopen ai gethub link

<!-- const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration); -->

# now creating route files in server folder

<axios >> in Openai.js file (The axios module is a popular JavaScript library that allows you to make HTTP requests from Node.js or a web browser. It provides an easy-to-use API for making HTTP requests to external resources such as REST APIs or web services. Here are some common reasons why you may use the axios module in Node.js:

Simplifies HTTP requests: The axios module simplifies making HTTP requests by providing an easy-to-use API that abstracts away the complexity of making network requests. It supports promises and async/await, which makes it easy to handle responses asynchronously.

Supports multiple protocols: axios supports a wide range of protocols, including HTTP, HTTPS, and FTP. It can also be used with a variety of data formats, including JSON, XML, and plain text.)

# then i created file in client folder in scr folder name (state) in that i created file called (api.js)

api.js file

in that i am using redux
importing some file from @reduxjs/toolkit/query/react

in main.jsx calling redux in </App>

<!-- //redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "@/state/aip.js";

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);


ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
<App /></Provider>); -->

# i made file C:\Users\shash\Desktop\Chat bot\client\src\Components\customMessageForms\Ai.jsx

Ai.jsx the i call export const { usePostAiTextMutation } = api; which i created in api.js
there i also created MessageFormUI.jsx file for backend

i am cut paste code of StandardMessageForm.jsx to MessageFormUI.jsx to use there component and call value as props now doing same in Ai.jsx
