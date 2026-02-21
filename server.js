import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 3000;

const imgDir = path.join(process.cwd(), "public", "img");
fs.mkdirSync(imgDir, { recursive: true });

app.use(express.static(path.join(process.cwd(), "public")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, imgDir),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname)
});

const upload = multer({ storage });

app.post("/upload", upload.single("photo"), (req, res) => {
  res.json({ ok:true });
});

app.listen(PORT, () => console.log("Server running on http://localhost:3000"));
