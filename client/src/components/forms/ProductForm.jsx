import {Select} from 'antd'

const {Option} = Select

const ProductForm = ({formData, setFormData, categoryList}) => {
	return (
		<>
			<div className='pt-2'>
				{formData.image ? (
					<div className='text-center'>
						<img
							src={URL.createObjectURL(formData.image)}
							alt='product photo'
							className='img img-responsive rounded'
							height='200px'
						/>
					</div>
				) : (
					<div className='text-center'>
						<img
							src={`${import.meta.env.VITE_API}/product/image/${formData.id}`}
							alt='product photo'
							className='img img-responsive rounded'
							height='200px'
						/>
					</div>
				)}
				<label className='btn btn-outline-secondary p-2 col-12'>
					{formData.image ? formData.image.name : 'Upload photo'}
					<input
						type='file'
						name='photo'
						accept='image/*'
						onChange={(e) => setFormData.setImage(e.target.files[0])}
						hidden
					/>
				</label>
			</div>
			<input
				type='text'
				className='form-control mb-3 p-2 mt-3'
				placeholder='Product name'
				value={formData.name}
				onChange={(e) => setFormData.setName(e.target.value)}
			/>
			<textarea
				type='text'
				className='form-control mb-3 p-2'
				placeholder='Description'
				value={formData.description}
				onChange={(e) => setFormData.setDescription(e.target.value)}
			/>
			<input
				type='number'
				className='form-control mb-3 p-2'
				placeholder='Price'
				value={formData.price}
				onChange={(e) => {
					if (e.target.value < 0) setFormData.setPrice(0)
					else setFormData.setPrice(e.target.value)
				}}
			/>
			<Select
				size='large'
				className='mb-3'
				placeholder='In stock?'
				value={formData.inStock === 1 ? 'Yes' : 'No'}
				style={{width: '100%'}}
				onChange={(value) => setFormData.setInStock(value)}
			>
				<Option value='1'>Yes</Option>
				<Option value='0'>No</Option>
			</Select>
			<Select
				size='large'
				className='mb-3'
				placeholder='Is featured?'
				value={formData.isFeatured === 1 ? 'Yes' : 'No'}
				style={{width: '100%'}}
				onChange={(value) => setFormData.setIsFeatured(value)}
			>
				<Option value='1'>Yes</Option>
				<Option value='0'>No</Option>
			</Select>
			<input
				type='number'
				className='form-control mb-3 p-2'
				placeholder='Weight'
				value={formData.weight}
				onChange={(e) => {
					if (e.target.value < 0) setFormData.setWeight(0)
					else setFormData.setWeight(e.target.value)
				}}
			/>

			<input
				type='text'
				className='form-control mb-3 p-2'
				placeholder='Flavour'
				value={formData.flavour}
				onChange={(e) => setFormData.setFlavour(e.target.value)}
			/>
			<Select
				size='large'
				className='mb-3'
				placeholder='Out of date?'
				value={formData.dated === 1 ? 'Yes' : 'No'}
				style={{width: '100%'}}
				onChange={(value) => setFormData.setDated(value)}
			>
				<Option value='1'>Yes</Option>
				<Option value='0'>No</Option>
			</Select>
			<input
				type='text'
				className='form-control mb-3 p-2'
				placeholder='Size'
				value={formData.size}
				onChange={(e) => setFormData.setSize(e.target.value)}
			/>
			<Select
				size='large'
				className='mb-3'
				placeholder='Choose categories'
				style={{width: '100%'}}
				value={formData.categories}
				onChange={(value) => setFormData.setCategories(value)}
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
				value={formData.tags}
				placeholder='Tags'
				onChange={(value) => setFormData.setTags(value)}
			/>
		</>
	)
}

export default ProductForm
