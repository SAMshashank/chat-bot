import express from "express";
import axios from "axios"; // best way to call API
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const chatEngineResponce = await axios.get(
      "https://api.chatengine.io/users/me",

      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": userName,
          "User-Secret": password,
        },
      }
    );
    res.status(200).json({ response: chatEngineResponce.data });
  } catch (err) {
    console.log("THE ERROR ", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const chatEngineResponce = await axios.post(
      "https://api.chatengine.io/users/",
      {
        username: userName,
        secret: password,
      },
      {
        headers: { "private-key": process.env.PRIVATE_KEY },
      }
    );

    res.status(200).json({ response: chatEngineResponce.data });
  } catch (err) {
    console.log("THE ERROR ", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
