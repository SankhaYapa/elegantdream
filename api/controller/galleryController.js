import Gallery from '../models/Gallery.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const galleryName = req.body.name;
    const dir = `uploads/gallery/${galleryName}`;

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

export const uploadGallery = upload.fields([{ name: 'thumbnail', maxCount: 1 },{ name: 'coverImg', maxCount: 1 }, { name: 'images', maxCount: 10 }]);

export const createGallery = async (req, res) => {
  const { name } = req.body;
  const { service } = req.body;
  const thumbnail = req.files['thumbnail'][0].filename;
  const coverImg = req.files['coverImg'][0].filename;
  const images = req.files['images'].map(file => file.filename);

  try {
    const newGallery = new Gallery({
      name,
      service,
      thumbnail: `/uploads/gallery/${name}/${thumbnail}`,
      coverImg: `/uploads/gallery/${name}/${coverImg}`,
      images: images.map(image => `/uploads/gallery/${name}/${image}`),
    });

    await newGallery.save();
    res.status(201).json(newGallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find();
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    res.status(200).json(galleryItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteGallery = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Gallery item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getGalleriesByService = async (req, res) => {
  try {
    const { service } = req.params; // Retrieve service from URL parameter
    const galleries = await Gallery.find({ service });
    res.status(200).json(galleries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};