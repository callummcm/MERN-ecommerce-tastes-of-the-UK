import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Select} from 'antd'
import toast from 'react-hot-toast'
import {ContentContext} from '../../context/ContentProvider'
import {useContext} from 'react'

const {Option} = Select

const CreateProduct = () => {
	const {categoryList} = useContext(ContentContext)

	const [image, setImage] = useState(null)
	const [name, setName] = useState('')
	const [categories, setCategories] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [inStock, setInStock] = useState(null)
	const [isFeatured, setIsFeatured] = useState(null)
	const [weightKg, setWeightKg] = useState('')
	const [tags, setTags] = useState('')
	const [flavour, setFlavour] = useState('')
	const [isDated, setIsDated] = useState(null)
	const [size, setSize] = useState('')

	//for mass updating collection fields
	const updateFields = async (e) => {
		e.preventDefault()
		try {
			const productData = new FormData()
			productData.append('image', image)
			await axios.patch('/update-product-fields', productData)
		} catch (error) {
			console.log(error)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const productData = new FormData()
			productData.append('image', image)
			productData.append('name', name)
			productData.append('categories', categories)
			productData.append('description', description)
			productData.append('price', price)
			productData.append('inStock', inStock)
			productData.append('isFeatured', isFeatured)
			productData.append('weightKg', weightKg)
			productData.append('tags', tags)
			productData.append('flavour', flavour)
			productData.append('isDated', isDated)
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
			{/* <button onClick={updateFields}>tset</button> */}
			<div className='p-3 mt-2 mb-2 h4 bg-light'>Create Product</div>
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
			<div className='form-floating'>
				<input
					type='text'
					className='form-control mb-3 mt-3'
					placeholder='Product name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<label className='opacity-50'>Product name</label>
			</div>

			<div className='form-floating'>
				<textarea
					type='text'
					className='form-control mb-3'
					placeholder='Description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<label className='opacity-50'>Description</label>
			</div>

			<div className='form-floating'>
				<input
					type='number'
					className='form-control mb-3'
					placeholder='Price'
					value={price}
					onChange={(e) => {
						if (e.target.value < 0) setPrice(0)
						else setPrice(e.target.value)
					}}
				/>
				<label className='opacity-50'>Price</label>
			</div>
			<div className='form-floating'>
				<input
					type='number'
					className='form-control mb-3'
					placeholder='Weight (kg)'
					value={weightKg}
					onChange={(e) => {
						if (e.target.value < 0) setWeightKg(0)
						else setWeightKg(e.target.value)
					}}
				/>
				<label className='opacity-50'>Weight (kg)</label>
			</div>
			<div className='form-floating'>
				<input
					type='text'
					className='form-control mb-3'
					placeholder='Flavour'
					value={flavour}
					onChange={(e) => setFlavour(e.target.value)}
				/>
				<label className='opacity-50'>Flavour</label>
			</div>
			<div className='form-floating'>
				<input
					type='text'
					className='form-control mb-3'
					placeholder='Size'
					onChange={(e) => setSize(e.target.value)}
				/>
				<label className='opacity-50'>Size</label>
			</div>
			<label className='ms-1' htmlFor='categoriesSelect'>
				Categories
			</label>
			<Select
				id='categoriesSelect'
				size='large'
				className='mb-3'
				style={{width: '100%'}}
				onChange={(value) => setCategories(value)}
			>
				{categoryList?.map((category) => (
					<Option key={category._id} value={category._id}>
						{category.name}
					</Option>
				))}
			</Select>
			<label className='ms-1' htmlFor='tagsSelect'>
				Tags
			</label>
			<Select
				id='tagsSelect'
				mode='tags'
				size='large'
				className='mb-3'
				allowClear
				style={{width: '100%'}}
				onChange={(value) => setTags(value)}
			/>
			<label className='ms-1' htmlFor='stockSelect'>
				In stock?
			</label>
			<Select
				id='stockSelect'
				size='large'
				className='mb-3'
				style={{width: '100%'}}
				onChange={(value) => setInStock(value)}
			>
				<Option value={true}>Yes</Option>
				<Option value={false}>No</Option>
			</Select>
			<label className='ms-1' htmlFor='featuredSelect'>
				Is featured?
			</label>
			<Select
				id='featuredSelect'
				size='large'
				className='mb-3'
				style={{width: '100%'}}
				onChange={(value) => setIsFeatured(value)}
			>
				<Option value={true}>Yes</Option>
				<Option value={false}>No</Option>
			</Select>
			<label className='ms-1' htmlFor='datedSelect'>
				Out of date?
			</label>
			<Select
				id='datedSelect'
				size='large'
				className='mb-3'
				style={{width: '100%'}}
				onChange={(value) => setIsDated(value)}
			>
				<Option value={true}>Yes</Option>
				<Option value={false}>No</Option>
			</Select>
			<button onClick={handleSubmit} className='btn btn-primary mb-5'>
				Create product
			</button>
		</>
	)
}

export default CreateProduct
