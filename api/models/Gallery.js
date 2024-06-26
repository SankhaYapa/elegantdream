import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  }, 
  coverImg: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

const Gallery = mongoose.model('Gallery', GallerySchema);

export default Gallery;
