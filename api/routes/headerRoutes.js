import express from 'express';
import { createHeader, getHeaders, deleteHeader, uploadHeaderImages } from '../controller/headerController.js';

const router = express.Router();

router.post('/', uploadHeaderImages, createHeader);
router.get('/', getHeaders);
router.delete('/:id', deleteHeader);

export default router;
