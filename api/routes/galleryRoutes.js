import express from 'express';
import { createGallery, getGallery, getGalleryItem, deleteGallery, uploadGallery, getGalleriesByService, updateGallery } from '../controller/galleryController.js';

const router = express.Router();

router.post('/', uploadGallery, createGallery);
router.get('/', getGallery);
router.get('/:id', getGalleryItem);
router.delete('/:id', deleteGallery);
router.get('/service/:service', getGalleriesByService);
router.put('/:id', uploadGallery, updateGallery);
export default router;
