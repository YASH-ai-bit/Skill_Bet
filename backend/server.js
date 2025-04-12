import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cocRoutes from "./routes/coc.route.js";
import gpRoutes from "./routes/gp.route.js";
import vpRoutes from "./routes/vp.route.js";
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000", "https://skill-bet-frontend.vercel.app/"],
  credentials: true,
}));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use("/api/coc", cocRoutes);
app.use("/api/gp", gpRoutes);
app.use("/api/vp", vpRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(8080, () => {
      console.log("Connected to db andListening on port 8080");
    });
});
  