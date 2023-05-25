import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  slug: {
    type: String,
    lowercase: true
  },
  shortDescription: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    trim: true,
    required: false
  },
  inStock: {
    type: Boolean,
    default: false,
    required: true
  },
  parent: {
    type: String,
    required: false
  },
  isFeatured: {
    type: Number,
    default: 0
  },
  weight: {
    type: Number,
    default: 0,
  },
  tags: {
    type: String,
    required: false,
  },
  category: {
    type: ObjectId,
    ref: 'Category',
    required: true,
  },
  quantity: {
    type: Number,
    default: 0
  },
  image: {
    data: Buffer,
    contentType: String
  },
  flavour: {
    type: String,
    required: false
  },
  dated: {
    type: String,
    required: false,
    default: "No"
  },
  size: {
    type: String,
    required: false
  }
}, { timestamps: true })

export default mongoose.model('Product', productSchema)