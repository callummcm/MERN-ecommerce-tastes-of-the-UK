import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Select} from 'antd'
import toast from 'react-hot-toast'
import ProductForm from '../forms/ProductForm'

const {Option} = Select

const CreateProduct = () => {
	const [categoryList, setCategoryList] = useState([])

	const [image, setImage] = useState(null)
	const [name, setName] = useState('')
	const [categories, setCategories] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [inStock, setInStock] = useState(null)
	const [isFeatured, setIsFeatured] = useState(null)
	const [weight, setWeight] = useState('')
	const [tags, setTags] = useState('')
	const [flavour, setFlavour] = useState('')
	const [dated, setDated] = useState(null)
	const [size, setSize] = useState('')

	useEffect(() => {
		fetchCategories()
	}, [])

	const fetchCategories = async () => {
		try {
			const {data: categories} = await axios.get('/categories')
			setCategoryList(categories)
		} catch (err) {
			console.log(err)
		}
	}

	//for mass updating collection fields
	const updateFields = async () => {
		try {
			await axios.patch('/update-product-fields')
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

			const {data} = await axios.post('/product', productData)
			if (data?.error) toast.error(data.error)
			else toast.success(`${data.name} created successfully`)
		} catch (error) {
			console.log(error)
			toast.error('product creation failed')
		}
	}

	return (
		<>
			<div className='p-3 mt-2 mb-2 h4 bg-light'>Manage Products</div>
			<div className='pt-2'>
				{image && (
					<div className='text-center'>
						<img
							src={URL.createObjectURL(image)}
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
				onChange={(e) => setSize(e.target.value)}
			/>
			<Select
				size='large'
				className='mb-3'
				placeholder='Choose categories'
				style={{width: '100%'}}
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
				placeholder='Tags'
				onChange={(value) => setTags(value)}
			/>
			<button onClick={handleSubmit} className='btn btn-primary mb-5'>
				Create product
			</button>
		</>
	)
}

export default CreateProduct
