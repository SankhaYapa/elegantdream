import Header from '../models/header.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/headers';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export const uploadHeaderImages = upload.array('images', 2);

export const createHeader = async (req, res) => {
  const { caption } = req.body;
  const images = req.files.map(file => `/uploads/headers/${file.filename}`);

  try {
    const newHeader = new Header({
      caption,
      images,
    });

    await newHeader.save();
    res.status(201).json(newHeader);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHeaders = async (req, res) => {
  try {
    const headers = await Header.find();
    res.status(200).json(headers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteHeader = async (req, res) => {
  try {
    await Header.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Header deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
