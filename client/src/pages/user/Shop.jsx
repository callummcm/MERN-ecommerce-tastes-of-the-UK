import axios from 'axios'
import {useEffect, useState} from 'react'
import Jumbotron from '../../components/cards/Jumbotron'
import ProductCard from '../../components/cards/ProductCard'
import {ContentContext} from '../../context/ContentProvider'
import {useContext} from 'react'
import {Radio, Pagination} from 'antd'
import {prices} from '../../helpers/prices'

const Shop = () => {
	const {categoryList} = useContext(ContentContext)

	const [products, setProducts] = useState([])
	const [selectedCategory, setSelectedCategory] = useState('')
	const [priceRange, setPriceRange] = useState([])
	const [pageNumber, setPageNumber] = useState(1)
	const [currentProductTotal, setCurrentProductTotal] = useState(0)

	useEffect(() => {
		if (selectedCategory.length || priceRange.length) fetchFilteredProducts()
		else {
			loadProducts()
			fetchUnfilteredProductTotal()
		}
	}, [selectedCategory, priceRange, pageNumber])

	useEffect(() => {
		setPageNumber(1)
	}, [selectedCategory, priceRange])

	const loadProducts = async () => {
		try {
			const {data} = await axios.get(`/list-products-pagination/${pageNumber}`)
			setProducts(data)
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		} catch (error) {
			console.log(error)
		}
	}

	const fetchUnfilteredProductTotal = async () => {
		try {
			const {data} = await axios.get('/products-count')
			setCurrentProductTotal(data)
		} catch (error) {
			console.log(error)
		}
	}

	const fetchFilteredProducts = async () => {
		try {
			const {data: filteredProducts} = await axios.post(
				`/filtered-products/${pageNumber}?getCount=false`,
				{
					selectedCategory,
					priceRange,
				}
			)
			const {data: productCount} = await axios.post(
				`/filtered-products/${pageNumber}?getCount=true`,
				{
					selectedCategory,
					priceRange,
				}
			)
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
			setCurrentProductTotal(productCount)
			setProducts(filteredProducts)
		} catch (error) {
			console.log(error)
		}
	}

	const handleResetFilter = () => {
		setSelectedCategory('')
		setPriceRange([])
		setPageNumber(1)
		loadProducts()
	}

	return (
		<>
			<Jumbotron
				title='Tastes of the UK'
				subtitle='Supplying the Best of British'
			/>

			<div className='container-fluid'>
				<div className='row'>
					<div className='col-md-1' />
					<div className='col-md-2'>
						<p className='p-3 mt-2 mb-2 h4 bg-light text-center'>
							Filter by Categories
						</p>
						<div className='px-5 pt-3'>
							<button
								className='btn btn-outline-secondary col-12'
								onClick={handleResetFilter}
							>
								Clear filter
							</button>
						</div>
						<div className='row p-5 pt-3'>
							<Radio.Group
								onChange={(e) => setSelectedCategory(e.target.value)}
								value={selectedCategory}
							>
								{categoryList?.map((c) => (
									<div key={c._id}>
										<Radio value={c._id}>{c.name}</Radio>
									</div>
								))}
							</Radio.Group>
						</div>
						<p className='p-3 h4 bg-light text-center'>Filter by Price</p>
						<div className='row p-5'>
							<Radio.Group
								onChange={(e) => setPriceRange(e.target.value)}
								value={priceRange}
							>
								{prices?.map((p) => (
									<div key={p._id}>
										<Radio value={p.array}>{p.name}</Radio>
									</div>
								))}
							</Radio.Group>
						</div>
					</div>

					<div className='col-md-8'>
						<p className='p-3 mt-2 mb-2 h4 bg-light text-center'>
							Found {currentProductTotal} results, showing{' '}
							{`${(pageNumber - 1) * 20 + 1} to ${Math.min(
								(pageNumber - 1) * 20 + 20,
								currentProductTotal
							)}`}{' '}
							Products
						</p>
						<div className='row'>
							{products?.map((p) => (
								<div key={p._id} className='col-md-3 mb-2'>
									<ProductCard product={p} />
								</div>
							))}
						</div>
						<div className='d-flex justify-content-around'>
							<Pagination
								defaultCurrent={1}
								defaultPageSize={20}
								showSizeChanger={false}
								current={pageNumber}
								onChange={(page) => setPageNumber(page)}
								total={currentProductTotal}
							/>
						</div>
					</div>
					<div className='col-md-1' />
				</div>
			</div>
		</>
	)
}

export default Shop
