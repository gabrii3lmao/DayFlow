import express from "express";
import mongoose from "mongoose";
// import cors from "cors";

import router from "./routes/activityRoutes.js";
import seedDays from "./seedDay.js";

const PORT = 3000;

async function startServer(): Promise<void> {
  const app = express();

  // Middlewares globais
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // app.use(
  //   cors({
  //     origin: "http://localhost:5173",
  //   })
  // );

  // Rotas da API
  app.use("/api", router);
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/activities_db");
    console.log("Connected to the database");

    // Seed após conexão com o banco
    await seedDays();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `There was an error trying to connect to the Database: ${error.message}`
      );
    } else {
      console.error("Unknown error while connecting to the Database");
    }
    process.exit(1);
  }
}

startServer();
