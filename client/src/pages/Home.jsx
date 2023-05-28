import {useEffect, useState} from 'react'
import Jumbotron from '../components/cards/Jumbotron'
import axios from 'axios'
import moment from 'moment'

const Home = () => {
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

	//for sorting if I wish too.
	const arr = [...products]
	const sortedbyFeatured = arr?.sort((a, b) =>
		a.isFeatured < b.isFeatured ? 1 : -1
	)

	// MOVE PRODUCT AND CATEGORY LIST INTO CONTEXT

	return (
		<>
			<Jumbotron
				title='Taste of the UK'
				subtitle='Supplying the best of British'
			/>
			<h2>New Arrivals</h2>
			{products?.map((p) => (
				<div key={p._id}>
					<p>{p.name}</p>
					<p>{moment(p.createdAt).fromNow()}</p>
					<p>${p.price}</p>
				</div>
			))}
			<h2>Featured</h2>
			{arr?.map((p) => (
				<div key={p._id}>
					<p>{p.name}</p>
					<p>{moment(p.createdAt).fromNow()}</p>
					<p>${p.price}</p>
				</div>
			))}
		</>
	)
}

export default Home
