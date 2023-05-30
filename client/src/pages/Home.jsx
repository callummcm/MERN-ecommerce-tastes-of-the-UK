import {useEffect, useState} from 'react'
import Jumbotron from '../components/cards/Jumbotron'
import axios from 'axios'
import moment from 'moment'
import ProductCard from '../components/cards/ProductCard'
import {ContentContext} from '../context/ContentProvider'
import {useContext} from 'react'

const Home = () => {
	const {featuredProducts} = useContext(ContentContext)
	const [products, setProducts] = useState([])

	useEffect(() => {
		loadProducts()
	}, [])

	const loadProducts = async () => {
		try {
			const {data} = await axios.get('/products')
			setProducts(data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Jumbotron
				title='Taste of the UK'
				subtitle='Supplying the best of British'
			/>

			<div className='row'>
				<div className='col-md-6'>
					<p className='p-3 mt-2 mb-2 h4 bg-light text-center'>New Arrivals</p>
					<div className='row'>
						{products?.map((p) => (
							<div key={p._id} className='col-md-3'>
								<ProductCard product={p} />
							</div>
						))}
					</div>
				</div>
				<div className='col-md-6'>
					<p className='p-3 mt-2 mb-2 h4 bg-light text-center'>
						Featured Products
					</p>
					<div className='row'>
						{featuredProducts?.map((p) => (
							<div key={p._id} className='col-md-6'>
								<ProductCard product={p} />
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default Home
