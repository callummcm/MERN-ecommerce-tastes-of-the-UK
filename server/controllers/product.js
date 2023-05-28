import Product from '../models/product.js'
import slugify from 'slugify'
import fs from 'fs'

export const create = async (req, res) => {
  try {

    const {
      name,
      description,
      price,
      categories,
      inStock,
      isFeatured,
      tags,
      weightKg,
      flavour,
      isDated,
      size
    } = req.fields
    const { image } = req.files

    let inStockBoolean
    let isFeaturedBoolean
    let isDatedBoolean

    if (inStock !== 'null') inStockBoolean = Boolean(inStock)
    if (isFeatured !== 'null') isFeaturedBoolean = Boolean(isFeatured)
    if (isDated !== 'null') isDatedBoolean = Boolean(isDated)

    switch (true) {
      case !name.trim(): return res.json({ error: 'Name is required' })
      //case !description.trim(): res.json({ error: 'Description is required' })
      case !price.trim(): return res.json({ error: 'Price is required' })
      case !categories.trim(): return res.json({ error: 'Category is required' })
      case !(typeof inStockBoolean === 'boolean'): return res.json({ error: 'In stock is required' })
      case !(typeof isFeaturedBoolean === 'boolean'): return res.json({ error: 'Featured is required' })
      //case !tags.trim(): res.json({ error: 'Tags are required' })
      case !weightKg.trim(): return res.json({ error: 'Weight is required' })
      //case !flavour.trim(): res.json({ error: 'Flavour is required' })
      case !(typeof isDatedBoolean === 'boolean'): return res.json({ error: 'Dated is required' })
      //case !size.trim(): res.json({ error: 'Size is required' })
      case image && image.size > 1000000: return res.json({ error: 'Image should be less than 1mb in size' })
    }

    const existingProduct = await Product.findOne({ name })
    if (existingProduct) return res.json({ error: 'Product already exists' })

    // create product
    const product = new Product({ ...req.fields, slug: slugify(name) })

    if (image) {
      product.image.data = fs.readFileSync(image.path)
      product.image.contentType = image.type
    }

    await product.save()
    return res.json(product)
  }
  catch (err) {
    console.log(err);
    return res.status(400).json(err)
  }
}

export const list = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate('categories')
      .select('-image')
      .limit(12)
      .sort({ createdAt: -1 })

    res.json(products)
  } catch (err) {
    console.log(err);
  }
}

export const listAll = async (req, res) => {
  try {

    const products = await Product.find({})
      .sort({ name: 1 })

    res.json(products)
  } catch (err) {
    console.log(err);
  }
}

export const read = async (req, res) => {
  try {

    const product = await Product.findOne({ slug: req.params.slug })
      .select('-image')
      .populate('categories')

    res.json(product)
  } catch (err) {
    console.log(err)
  }
}

export const image = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id)
      .select('image')

    if (product.image.data) {
      res.set('Content-Type', product.image.contentType)
      return res.send(product.image.data)
    }
    else if (product.image !== null) {
      return res.send(product.image)
    }

  } catch (err) {
    console.log(err)
  }
}

export const remove = async (req, res) => {
  try {

    const product = await Product.findByIdAndDelete(req.params.id)
      .select('-image')

    res.json(product)

  } catch (err) {
    console.log(err)
  }
}

export const update = async (req, res) => {
  try {

    const {
      name,
      description,
      price,
      categories,
      inStock,
      isFeatured,
      tags,
      weightKg,
      flavour,
      isDated,
      size
    } = req.fields
    const { image } = req.files

    let inStockBoolean
    let isFeaturedBoolean
    let isDatedBoolean

    if (inStock !== 'null') inStockBoolean = Boolean(inStock)
    if (isFeatured !== 'null') isFeaturedBoolean = Boolean(isFeatured)
    if (isDated !== 'null') isDatedBoolean = Boolean(isDated)

    switch (true) {
      case !name.trim(): return res.json({ error: 'Name is required' })
      //case !description.trim(): res.json({ error: 'Description is required' })
      case !price.trim(): return res.json({ error: 'Price is required' })
      case !categories.trim(): return res.json({ error: 'Category is required' })
      case !(typeof inStockBoolean === 'boolean'): return res.json({ error: 'In stock is required' })
      case !(typeof isFeaturedBoolean === 'boolean'): return res.json({ error: 'Featured is required' })
      //case !tags.trim(): res.json({ error: 'Tags are required' })
      case !weightKg.trim(): return res.json({ error: 'Weight is required' })
      //case !flavour.trim(): res.json({ error: 'Flavour is required' })
      case !(typeof isDatedBoolean === 'boolean'): return res.json({ error: 'Dated is required' })
      //case !size.trim(): res.json({ error: 'Size is required' })
      case image && image.size > 1000000: return res.json({ error: 'Image should be less than 1mb in size' })
    }

    // update product
    //console.log(image)
    const product = await Product.findByIdAndUpdate(req.params.id, {
      ...req.fields,
      slug: slugify(name)
    }, { new: true })

    if (image) {
      const newImage = {
        data: fs.readFileSync(image.path),
        contentType: image.type
      };

      product.image = newImage;
    }

    await product.save()
    return res.json(product)
  }
  catch (err) {
    console.log(err);
    return res.status(400).json(err)
  }
}

export const removeFields = async (req, res) => {
  try {


    const products = await Product.find({})

    products.map(async (p) => {
      try {
        const response = await Product.updateOne(
          { _id: p._id },
          {
            $set:
            {
              slug: slugify(p.name)
            }
          }
        );
      } catch (error) {
        console.log(error)
      }

    })

    console.log('attempting removal of fields')
    // const response = await Product.updateOne(
    //   { _id: '64719cbf1f8a9f22175bb295' },
    //   {
    //     $set:
    //     {
    //       slug: slugify(products.name)
    //     }
    //   }


    // );
    //Cheese and Onion, Yes

    console.log(response)
    return res.json(response)
  } catch (error) {
    console.log('Error:', error.message)
  }
}