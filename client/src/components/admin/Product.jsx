import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Select} from 'antd'

const {Option} = Select

const Product = () => {
	const [categoryList, setCategoryList] = useState([])
	const [productList, setProductList] = useState([])

	const [image, setImage] = useState('')
	const [name, setName] = useState('')
	const [category, setCategory] = useState('')
	const [description, setDescription] = useState('')
	const [shortDescription, setShortDescription] = useState('')
	const [price, setPrice] = useState('')
	const [inStock, setInStock] = useState('')
	const [parent, setParent] = useState('')
	const [isFeatured, setIsFeatured] = useState('')
	const [weight, setWeight] = useState('')
	const [tags, setTags] = useState('')
	const [quantity, setQuantity] = useState('')
	const [flavour, setFlavour] = useState('')
	const [dated, setDated] = useState('')
	const [size, setSize] = useState('')

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			const {data: categories} = await axios.get('/categories')
			const {data: products} = await axios.get('/all-products')
			setCategoryList(categories)
			setProductList(products)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<div className='p-3 mt-2 mb-2 h4 bg-light'>Manage Products</div>

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
			<textarea
				type='text'
				className='form-control mb-3 p-2'
				placeholder='Short description'
				value={shortDescription}
				onChange={(e) => setShortDescription(e.target.value)}
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
			<input
				type='number'
				min='0'
				className='form-control mb-3 p-2'
				placeholder='Quantity'
				value={quantity}
				onChange={(e) => {
					if (e.target.value < 0) setQuantity(0)
					else setQuantity(e.target.value)
				}}
			/>
			<input
				type='number'
				min='0'
				max='1'
				className='form-control mb-3 p-2'
				placeholder='In stock? 0 or 1'
				value={inStock}
				onChange={(e) => {
					if (e.target.value < 0) setInStock(0)
					else if (e.target.value > 1) setInStock(1)
					else setInStock(e.target.value)
				}}
			/>
			<input
				type='number'
				className='form-control mb-3 p-2'
				placeholder='Is featured? 0 or 1'
				value={isFeatured}
				onChange={(e) => {
					if (e.target.value < 0) setIsFeatured(0)
					else if (e.target.value > 1) setIsFeatured(1)
					else setIsFeatured(e.target.value)
				}}
			/>
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
			<input
				type='text'
				className='form-control mb-3 p-2'
				placeholder='Dated'
				value={dated}
				onChange={(e) => {
					if (e.target.value < 0) setDated(0)
					else if (e.target.value > 1) setDated(1)
					else setDated(e.target.value)
				}}
			/>
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
				placeholder='Choose parent product if any'
				style={{width: '100%'}}
				showSearch
				onChange={(value) => setParent(value)}
			>
				{productList?.map((product) => (
					<Option key={product._id} value={product.Name}>
						{product.Name}
					</Option>
				))}
			</Select>
			<Select
				size='large'
				className='mb-3'
				placeholder='Choose category'
				style={{width: '100%'}}
				showSearch
				onChange={(value) => setCategory(value)}
			>
				{categoryList?.map((category) => (
					<Option key={category._id} value={category.name}>
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

			<div className='pt-2'>
				<label className='btn btn-outline-secondary p-2 col-12 mb-3'>
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
			{image && (
				<div className='text-center'>
					<img
						src={URL.createObjectURL(image)}
						alt='product photo'
						className='img img-responsive'
						height='200px'
					/>
				</div>
			)}
		</>
	)
}

export default Product
