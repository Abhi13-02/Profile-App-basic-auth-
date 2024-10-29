import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { getAllUsers, deleteUser } from "../controllers/adminControllers.js"; // Import deleteUser controller

const adminRouter = express.Router();

// Route to get all users
adminRouter.route("/allUsers").get(protect, adminMiddleware, getAllUsers);

// Route to delete a user by ID
adminRouter
  .route("/deleteUser/:id")
  .delete(protect, adminMiddleware, deleteUser); // Add delete route

export default adminRouter;
