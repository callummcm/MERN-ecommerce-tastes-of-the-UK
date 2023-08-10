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
    const products = await Product.find({ price: { $ne: '', $ne: null, $type: 'number' } })
      .populate('categories')
      .select('-image')
      .limit(20)
      .sort({ createdAt: -1 })

    return res.json(products)
  } catch (err) {
    console.log(err);
    return res.status(400).json(err)
  }
}

export const listAll = async (req, res) => {
  try {

    const products = await Product.find({ price: { $ne: '', $ne: null, $type: 'number' } })
      .sort({ name: 1 })

    return res.json(products)
  } catch (err) {
    console.log(err);
    return res.status(400).json(err)
  }
}

export const fetchFeatured = async (req, res) => {
  try {

    const featuredProducts = await Product.find({ isFeatured: true })
      .populate('categories')
      .limit(12)
      .sort({ name: 1 })

    return res.json(featuredProducts)
  } catch (err) {
    console.log(err);
    return res.status(400).json(err)
  }
}

export const read = async (req, res) => {
  try {

    const product = await Product.findOne({ slug: req.params.slug })
      .select('-image')
      .populate('categories')

    return res.json(product)
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
}

export const image = async (req, res) => {
  try {

    let product = await Product.findById(req.params.id)
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
    return res.status(400).json(err)
  }
}

export const remove = async (req, res) => {
  try {

    const product = await Product.findByIdAndDelete(req.params.id)
      .select('-image')

    return res.json(product)

  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
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

    if (inStock !== 'null' && inStock !== '') inStockBoolean = Boolean(inStock)
    if (isFeatured !== 'null' && isFeatured !== '') isFeaturedBoolean = Boolean(isFeatured)
    if (isDated !== 'null' && isDated !== '') isDatedBoolean = Boolean(isDated)

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

export const filteredProducts = async (req, res) => {
  try {
    const { selectedCategory, priceRange } = req.body

    const getCount = req.query.getCount
    const perPage = 20
    const page = req.params.page ? req.params.page : 1

    let args = {}
    if (selectedCategory.length) args.categories = selectedCategory
    if (priceRange.length) args.price = { $gte: priceRange[0], $lte: priceRange[1] }

    if (getCount === 'true') {
      const filteredProductCount = await Product.find(args).countDocuments()
      return res.json(filteredProductCount)
    }
    const products = await Product.find(args)
      .skip((page - 1) * perPage)
      .limit(20)
      .sort({ createdAt: -1, _id: -1 })
      .select('-image')
    return res.json(products)

  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

export const productsCount = async (req, res) => {
  try {

    const total = await Product.find({}).estimatedDocumentCount()
    return res.json(total)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

export const productSearch = async (req, res) => {
  try {
    const { keyword } = req.params
    const results = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    })
      .select('-image')

    return res.json(results)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

export const fetchRelatedProducts = async (req, res) => {
  try {
    const { productId, categoryId } = req.params
    const related = await Product.find({
      categories: categoryId,
      _id: { $ne: productId }
    })
      .select('-image')
      .populate('categories')
      .limit(6)

    res.json(related)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

export const listProductsPagination = async (req, res) => {
  try {
    const perPage = 20
    const page = req.params.page ? req.params.page : 1
    const products = await Product.find({})
      .skip((page - 1) * perPage)
      .select('-image')
      .sort({ createdAt: -1, _id: -1 })
      .limit(perPage)



    return res.json(products)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

export const removeFields = async (req, res) => {
  try {

    //console.log(req.fields)
    //console.log(req.files)

    const { image } = req.files
    //console.log(image)

    const products = await Product.find({})

    products.map(async (p) => {
      try {
        const response = await Product.updateOne(
          { _id: p._id },
          {
            $set:
            {
              image: {
                data: fs.readFileSync(image.path),
                contentType: image.type
              }
            }
          }
        );
        return res.json(response)
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

    return res.json(response)
  } catch (error) {
    console.log('Error:', error.message)
  }
}