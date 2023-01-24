import multer, { diskStorage } from "multer";

const storage = diskStorage({
  destination: "./images",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("myImage");
