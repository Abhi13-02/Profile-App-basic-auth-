import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import userRouts from './routes/userRoutes.js';
import adminRouts from './routes/adminRouts.js';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import path from 'path';

const port = process.env.PORT || 5001;
connectDB();

const app = express();
app.use(express.json()); //for parsing json raw req.body
app.use(express.urlencoded({ extended: true })); //for parsing url encoded data i.e form data
app.use(cookieParser()); //used to parse cookies attached to the client request object

app.use('/api/users', userRouts);
app.use('/api/admin',adminRouts);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("server is ready...");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));