import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { app } from "./app.js";
dotenv.config({ path: ".env" });

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("error: " + error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
