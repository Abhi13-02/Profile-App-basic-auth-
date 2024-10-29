// backend/multer.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryCofig.js"; 

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Basic_auth", // Change "new_project_folder" to your desired folder name
    format: async (req, file) => {
      const format = file.mimetype.split("/")[1];
      return format === "jpeg" ? "jpg" : format;
    },
    public_id: (req, file) => file.originalname,
  },
});

const upload = multer({ storage: storage });

export default upload;
