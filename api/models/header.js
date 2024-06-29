import mongoose from 'mongoose';

const headerSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
});

export default mongoose.model('Header', headerSchema);
