import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    trim: true,
    required: true
  },
  inStock: {
    type: Boolean,
    default: false,
    required: true
  },
  isFeatured: {
    type: Number,
    default: 0
  },
  weightKg: {
    type: Number,
    default: 0,
    required: true
  },
  tags: {
    type: String,
    required: false,
  },
  categories: {
    type: ObjectId,
    ref: 'Category',
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String
  },
  flavour: {
    type: String,
    required: false
  },
  isDated: {
    type: Number,
    required: false,
    default: 0
  },
  size: {
    type: String,
    required: false
  }
}, { timestamps: true })

export default mongoose.model('Product', productSchema)