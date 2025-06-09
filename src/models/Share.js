import mongoose from 'mongoose';

const shareSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    length: 4
  },
  type: {
    type: String,
    required: true,
    enum: ['file', 'text']
  },
  content: {
    type: String,
    required: true
  },
  blobUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // 5 minutes in seconds
  }
});

const Share = mongoose.models.Share || mongoose.model('Share', shareSchema);
export default Share;