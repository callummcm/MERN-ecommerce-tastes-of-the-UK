import Product from '../models/product.js'
import slugify from 'slugify'
import fs from 'fs'

export const create = async (req, res) => {
  try {

    const {
      name,
      description,
      shortDescription,
      price,
      category,
      quantity,
      inStock,
      isFeatured,
      tags,
      weight,
      flavour,
      dated,
      size
    } = req.fields
    const { photo } = req.files

    switch (true) {
      case !name.trim(): res.json({ error: 'Name is required' })
      //case !description.trim(): res.json({ error: 'Description is required' })
      //case !shortDescription.trim(): res.json({ error: 'Short description is required' })
      case !price.trim(): res.json({ error: 'Price is required' })
      case !category.trim(): res.json({ error: 'Category is required' })
      //case !quantity.trim(): res.json({ error: 'Quantity is required' })
      //case !inStock.trim(): res.json({ error: 'Shipping is required' })
      //case !isFeatured.trim(): res.json({ error: 'Featured is required' })
      //case !tags.trim(): res.json({ error: 'Tags are required' })
      //case !weight.trim(): res.json({ error: 'Weight is required' })
      //case !flavour.trim(): res.json({ error: 'Flavour is required' })
      //case !dated.trim(): res.json({ error: 'Dated is required' })
      //case !size.trim(): res.json({ error: 'Size is required' })
      case photo && photo.size > 1000000: res.json({ error: 'Image should be less than 1mb in size' })
    }

    // create product
    const product = new Product({ ...req.fields, slug: slugify(name) })

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path)
      product.photo.contentType = photo.type
    }

    await product.save()
    res.json(product)
  }
  catch (err) {
    console.log(err);
    return res.status(400).json(err)
  }
}

export const list = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate('category')
      .select('-photo')
      .limit(12)
      .sort({ createdAt: -1 })

    res.json(products)
  } catch (err) {
    console.log(err);
  }
}

export const listAll = async (req, res) => {
  try {

    const projection = { _id: 1, Name: 1 }

    const products = await Product.find({})
      .sort({ Name: 1 })

    res.json(products)
  } catch (err) {
    console.log(err);
  }
}

export const read = async (req, res) => {
  try {

    const product = await Product.findOne({ slug: req.params.slug })
      .select('-photo')
      .populate('category')

    res.json(product)
  } catch (err) {
    console.log(err)
  }
}

export const photo = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id)
      .select('photo')

    if (product.photo.data) {
      res.set('Content-Type', product.photo.contentType)
      return res.send(product.photo.data)
    }

  } catch (err) {
    console.log(err)
  }
}

export const remove = async (req, res) => {
  try {

    const product = await Product.findByIdAndDelete(req.params.id)
      .select('-photo')

    res.json(product)

  } catch (err) {
    console.log(err)
  }
}

export const update = async (req, res) => {
  try {

    const { name, description, price, category, quantity, shipping } = req.fields
    const { photo } = req.files

    switch (true) {
      case !name.trim(): res.json({ error: 'Name is required' })
      case !description.trim(): res.json({ error: 'Description is required' })
      case !price.trim(): res.json({ error: 'Price is required' })
      case !category.trim(): res.json({ error: 'Category is required' })
      case !quantity.trim(): res.json({ error: 'Quantity is required' })
      case !shipping.trim(): res.json({ error: 'Shipping is required' })
      case photo && photo.size > 1000000: res.json({ error: 'Image should be less than 1mb in size' })
    }

    // update product
    const product = await Product.findByIdAndUpdate(req.params.id, {
      ...req.fields,
      slug: slugify(name)
    }, { new: true })

    if (photo) {
      console.log(photo)
      product.photo.data = fs.readFileSync(photo.path)
      product.photo.contentType = photo.type
    }

    await product.save()
    res.json(product)
  }
  catch (err) {
    console.log(err);
    return res.status(400).json(err)
  }
}