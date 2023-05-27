import axios from 'axios'
import {useEffect, useState} from 'react'
import {Select} from 'antd'
import ProductForm from '../forms/ProductForm'
import slugify from 'slugify'
import toast from 'react-hot-toast'

const {Option} = Select

const ManageProducts = () => {
	const [productList, setProductList] = useState([])
	const [categoryList, setCategoryList] = useState([])

	const [id, setId] = useState('')
	const [image, setImage] = useState(null)
	const [name, setName] = useState('')
	const [categories, setCategories] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [inStock, setInStock] = useState('')
	const [isFeatured, setIsFeatured] = useState('')
	const [weight, setWeight] = useState('')
	const [tags, setTags] = useState([])
	const [flavour, setFlavour] = useState('')
	const [dated, setDated] = useState('')
	const [size, setSize] = useState('')

	const [selectedProduct, setSelectedProduct] = useState(null)

	useEffect(() => {
		fetchProductsAndCategories()
	}, [])

	useEffect(() => {
		if (selectedProduct) loadSelectedProduct()
	}, [selectedProduct])

	const fetchProductsAndCategories = async () => {
		try {
			const {data: products} = await axios.get('/all-products')
			setProductList(products)
			const {data: categories} = await axios.get('/categories')
			setCategoryList(categories)
		} catch (err) {
			console.log(err)
		}
	}

	const loadSelectedProduct = async () => {
		try {
			const {data: productToDisplay} = await axios.get(
				`/product/${selectedProduct}`
			)

			setId(productToDisplay._id)
			//setImage(productToDisplay.image)
			setName(productToDisplay.name || '')
			setCategories(productToDisplay.categories._id || '')
			setDescription(productToDisplay.description || '')
			setPrice(productToDisplay.price || 0) // Initialize with 0 or appropriate default value
			setInStock(productToDisplay.inStock || 0) // Initialize with 0 or appropriate default value
			setIsFeatured(productToDisplay.isFeatured || 0) // Initialize with 0 or appropriate default value
			setWeight(productToDisplay.weight || 0) // Initialize with 0 or appropriate default value
			setTags(productToDisplay.tags.split(',').map((tag) => tag.trim()) || [])
			setFlavour(productToDisplay.flavour || '')
			setDated(productToDisplay.dated !== null ? productToDisplay.dated : 0)
			setSize(productToDisplay.size || '')
		} catch (error) {
			console.log(error)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const productData = new FormData()
			console.log(image)
			productData.append('image', image)
			productData.append('name', name)
			productData.append('categories', categories)
			productData.append('description', description)
			productData.append('price', price)
			productData.append('inStock', inStock)
			productData.append('isFeatured', isFeatured)
			productData.append('weightKg', weight)
			productData.append('tags', tags)
			productData.append('flavour', flavour)
			productData.append('dated', dated)
			productData.append('size', size)

			const {data} = await axios.put(`/product/${id}`, productData)
			if (data?.error) toast.error(data.error)
			else toast.success(`${data.name} created successfully`)
		} catch (error) {
			console.log(error)
			toast.error('product creation failed')
		}
	}

	return (
		<>
			<Select
				size='large'
				className='mb-2 mt-2'
				placeholder='Select product to manage'
				style={{width: '100%'}}
				showSearch
				onChange={(value) => setSelectedProduct(slugify(value).toLowerCase())}
			>
				{productList?.map((p) => (
					<Option key={p._id} value={p.name}>
						{p.name}
					</Option>
				))}
			</Select>
			<hr />
			<div className='pt-2'>
				{image ? (
					<div className='text-center'>
						<img
							src={URL.createObjectURL(image)}
							alt='product photo'
							className='img img-responsive rounded'
							height='200px'
						/>
					</div>
				) : (
					<div className='text-center'>
						<img
							// doesn't like loading img from database if string
							src={`${import.meta.env.VITE_API}/product/image/${id}`}
							alt='product photo'
							className='img img-responsive rounded'
							height='200px'
						/>
					</div>
				)}
				<label className='btn btn-outline-secondary p-2 col-12'>
					{image ? image.name : 'Upload photo'}
					<input
						type='file'
						name='photo'
						accept='image/*'
						onChange={(e) => setImage(e.target.files[0])}
						hidden
					/>
				</label>
			</div>
			<input
				type='text'
				className='form-control mb-3 p-2 mt-3'
				placeholder='Product name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<textarea
				type='text'
				className='form-control mb-3 p-2'
				placeholder='Description'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<input
				type='number'
				className='form-control mb-3 p-2'
				placeholder='Price'
				value={price}
				onChange={(e) => {
					if (e.target.value < 0) setPrice(0)
					else setPrice(e.target.value)
				}}
			/>
			<Select
				size='large'
				className='mb-3'
				placeholder='In stock?'
				value={inStock === 1 ? 'Yes' : 'No'}
				style={{width: '100%'}}
				onChange={(value) => setInStock(value)}
			>
				<Option value='1'>Yes</Option>
				<Option value='0'>No</Option>
			</Select>
			<Select
				size='large'
				className='mb-3'
				placeholder='Is featured?'
				value={isFeatured === 1 ? 'Yes' : 'No'}
				style={{width: '100%'}}
				onChange={(value) => setIsFeatured(value)}
			>
				<Option value='1'>Yes</Option>
				<Option value='0'>No</Option>
			</Select>
			<input
				type='number'
				className='form-control mb-3 p-2'
				placeholder='Weight'
				value={weight}
				onChange={(e) => {
					if (e.target.value < 0) setWeight(0)
					else setWeight(e.target.value)
				}}
			/>

			<input
				type='text'
				className='form-control mb-3 p-2'
				placeholder='Flavour'
				value={flavour}
				onChange={(e) => setFlavour(e.target.value)}
			/>
			<Select
				size='large'
				className='mb-3'
				placeholder='Out of date?'
				value={dated === 1 ? 'Yes' : 'No'}
				style={{width: '100%'}}
				onChange={(value) => setDated(value)}
			>
				<Option value='1'>Yes</Option>
				<Option value='0'>No</Option>
			</Select>
			<input
				type='text'
				className='form-control mb-3 p-2'
				placeholder='Size'
				value={size}
				onChange={(e) => setSize(e.target.value)}
			/>
			<Select
				size='large'
				className='mb-3'
				placeholder='Choose categories'
				style={{width: '100%'}}
				value={categories}
				onChange={(value) => setCategories(value)}
			>
				{categoryList?.map((category) => (
					<Option key={category._id} value={category._id}>
						{category.name}
					</Option>
				))}
			</Select>
			<Select
				mode='tags'
				size='large'
				className='mb-3'
				allowClear
				style={{width: '100%'}}
				value={tags}
				placeholder='Tags'
				onChange={(value) => setTags(value)}
			/>
			<button onClick={handleSubmit} className='btn btn-primary mb-5'>
				Update product
			</button>
		</>
	)
}

export default ManageProducts
