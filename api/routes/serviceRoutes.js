import express from 'express';
import multer from 'multer';
import { getAllServices, createService, updateService, deleteService, getServiceById } from '../controller/serviceController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/services');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/', getAllServices);
router.post('/', upload.single('image'), createService);
router.put('/:id', upload.single('image'), updateService);
router.delete('/:id', deleteService);
router.get('/:id', getServiceById); 
export default router;
