import express from 'express';
import { loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateProfile
} from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.route("/register").post(upload.single("pic"),registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, upload.single("pic"), updateProfile);


export default router;