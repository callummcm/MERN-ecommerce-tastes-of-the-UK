import {useEffect, useState} from 'react'
import Jumbotron from '../../components/cards/Jumbotron'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import ProductCard from '../../components/cards/ProductCard'
import {Badge} from 'antd'
import {CartContext} from '../../context/CartContext'
import {useContext} from 'react'
import toast from 'react-hot-toast'

const ProductView = () => {
	const [product, setProduct] = useState({})
	const [relatedProducts, setRelatedProducts] = useState([])

	const [isInStock, setIsInStock] = useState('')
	const [quantity, setQuantity] = useState(1)
	const [activeTab, setActiveTab] = useState('description')

	const {cart, setCart, increaseCartQuantity, addToCart} =
		useContext(CartContext)

	const params = useParams()

	useEffect(() => {
		if (params?.slug) fetchProduct()
	}, [params?.slug])

	useEffect(() => {
		if (product?.inStock) setIsInStock('In stock')
		else setIsInStock('Out of stock')
	}, [product])

	const fetchProduct = async (req, res) => {
		try {
			const {data} = await axios.get(`/product/${params?.slug}`)
			setProduct(data)
			fetchRelatedProducts(data?._id, data?.categories?._id)
		} catch (error) {
			console.log(error)
		}
	}

	const handleTabChange = (tab) => {
		setActiveTab(tab)
	}

	const fetchRelatedProducts = async (productId, categoryId) => {
		const {data} = await axios.get(
			`/related-products/${productId}/${categoryId}`
		)
		setRelatedProducts(data)
	}

	return (
		<>
			<div>
				{Object.keys(product).length && (
					<div className='container-fluid my-4'>
						<div className='row'>
							<div className='col-md-1'></div>
							<div className='col-md-7'>
								<div className='container-fluid'>
									<div className='row'>
										<div className='col-md-6'>
											<img
												src={`${import.meta.env.VITE_API}/product/image/${
													product?._id
												}`}
												alt='Product'
												style={{
													height: '500px',
													width: '100%',
													objectFit: 'cover',
												}}
												className='img img-fluid rounded-top card-img-top'
											/>
										</div>
										<div className='col-md-6 d-flex flex-column'>
											<h1>{product?.name}</h1>
											<p>{product?.flavour}</p>
											<p className='lead'>
												{product?.price?.toLocaleString('en-NZ', {
													style: 'currency',
													currency: 'NZD',
												})}
											</p>
											<div className='input-group mb-3 mt-auto'>
												<input
													type='number'
													className='form-control form-control-sm text-center'
													value={quantity}
													onChange={(e) => setQuantity(e.target.value)}
													min='1'
													style={{maxWidth: '90px'}}
												/>
												<button
													className='btn btn-primary col card-button m-3'
													onClick={() => {
														increaseCartQuantity(product, quantity)
														toast.success('Added to cart')
													}}
												>
													Add to Cart
												</button>
											</div>
										</div>
									</div>
									<ul className='nav nav-tabs my-4'>
										<li className='nav-item'>
											<button
												className={`nav-link ${
													activeTab === 'description' ? 'active' : ''
												}`}
												onClick={() => handleTabChange('description')}
												style={{textDecoration: 'none'}}
											>
												Description
											</button>
										</li>
										<li className='nav-item'>
											<button
												className={`nav-link ${
													activeTab === 'extraInfo' ? 'active' : ''
												}`}
												onClick={() => handleTabChange('extraInfo')}
												style={{textDecoration: 'none'}}
											>
												Extra Info
											</button>
										</li>
									</ul>
									<div className='tab-content'>
										<div
											className={`tab-pane ${
												activeTab === 'description' ? 'active' : ''
											}`}
											style={{textDecoration: 'none'}}
										>
											<p>{product?.description}</p>
										</div>
										<div
											className={`tab-pane ${
												activeTab === 'extraInfo' ? 'active' : ''
											}`}
										>
											<p>Weight: {product?.weightKg}kg</p>
											<p>Category: {product?.categories?.name}</p>
											<p>Tag: {product?.tags}</p>
										</div>
									</div>
								</div>
							</div>
							<div className='col-md-3'>
								<div className='row'></div>
								<h2>Related Products</h2>
								{relatedProducts?.length < 1 && <p>Nothing found</p>}
								<div className='row'>
									{relatedProducts?.map((p) => (
										<div className='col-md-6' key={p._id}>
											<ProductCard product={p} />
										</div>
									))}
								</div>
							</div>
							<div className='col-md-1'></div>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default ProductView
