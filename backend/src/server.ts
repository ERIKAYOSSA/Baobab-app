import dotenv from "dotenv";
import app from "./app";
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", (_req, res) => {
  res.json({
    application: "Baobab",
    version: "1.0.0",
    status: "online"
  });
});

app.listen(PORT, () => {
  console.log(` Baobab API running on port ${PORT}`);
});