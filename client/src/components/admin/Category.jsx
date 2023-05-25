import {useState, useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import CategoryForm from '../forms/CategoryForm'
import {Modal} from 'antd'

const Category = () => {
	const [categoryName, setCategoryName] = useState('')
	const [categories, setCategories] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState('')
	const [selectedCategoryName, setSelectedCategoryName] = useState('')

	useEffect(() => {
		fetchCategories()
	}, [])

	const fetchCategories = async () => {
		try {
			const {data} = await axios.get('/categories')
			setCategories(data)
		} catch (err) {
			console.log(err)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const {data} = await axios.post('/category', {
				name: categoryName,
			})

			if (data?.error) toast.error(data.error)
			else {
				setCategoryName('')
				fetchCategories()
				toast.success(`"${data.name}" created successfully`)
			}
		} catch (err) {
			console.log(err)
			toast.error('Create category failed. Try again')
		}
	}

	const handleCategoryUpdate = async (e) => {
		e.preventDefault()
		try {
			const {data} = await axios.put(`/category/${selectedCategory._id}`, {
				name: selectedCategoryName,
			})

			if (data?.error) toast.error(data.error)
			else {
				setSelectedCategoryName('')
				setShowModal(false)
				fetchCategories()
				toast.success(`"${data.name}" updated successfully`)
			}
		} catch (err) {
			console.log(err)
			toast.error('Update category failed. Name may already exist. Try again')
		}
	}

	const handleCategoryDelete = async (e) => {
		e.preventDefault()
		try {
			const {data} = await axios.delete(`/category/${selectedCategory._id}`)

			if (data?.error) toast.error(data.error)
			else {
				setSelectedCategoryName('')
				setShowModal(false)
				fetchCategories()
				toast.success(`"${data.name}" deleted successfully`)
			}
		} catch (err) {
			console.log(err)
			toast.error('Delete category failed. Try again')
		}
	}

	return (
		<>
			<div className='p-3 mt-2 mb-2 h4 bg-light'>Manage Categories</div>
			<CategoryForm
				handleSubmit={handleSubmit}
				value={categoryName}
				setValue={setCategoryName}
				buttonText='Create category'
				showDeleteButton={false}
			/>
			<hr />
			<div className='p-3'>
				{categories?.map((category) => (
					<button
						key={category._id}
						className='btn btn-outline-primary mb-2 me-3'
						onClick={() => {
							setSelectedCategory(category)
							setSelectedCategoryName(category.name)
							setShowModal(true)
						}}
					>
						{category.name}
					</button>
				))}
			</div>
			<Modal
				title='Manage category'
				open={showModal}
				onOk={() => setShowModal(false)}
				onCancel={() => setShowModal(false)}
				footer={null}
			>
				<CategoryForm
					handleSubmit={handleCategoryUpdate}
					value={selectedCategoryName}
					setValue={setSelectedCategoryName}
					buttonText='Update category'
					showDeleteButton={true}
					handleDelete={handleCategoryDelete}
				/>
			</Modal>
		</>
	)
}

export default Category
