import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        if(!users || users.length === 0) {
            res.status(404);
            throw new Error("No users found");
        }
        res.status(200).json(users);
    } catch (error) {
        throw new Error("erreor in get all users");
    }
});


const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params; // Get user ID from request parameters

    const user = await User.findById(id);

    if(user._id.toString() === req.user._id.toString()) {
      throw new Error("Cannot delete yourself");
    }

    await User.deleteOne({ _id: id }); // Remove the user from the database
    res.status(200).json({ message: "User deleted successfully" });
  
});

export { getAllUsers, deleteUser };
