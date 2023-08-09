import {useEffect, useState} from 'react'
import Jumbotron from '../../components/cards/Jumbotron'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const ProductView = () => {
	const [product, setProduct] = useState({})

	const params = useParams()

	useEffect(() => {
		if (params?.slug) fetchProduct()
	}, [])

	const fetchProduct = async (req, res) => {
		try {
			const {data} = await axios.get(`/product/${params?.slug}`)
			setProduct(data)
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<pre>{JSON.stringify(product, null, 4)}</pre>
		</>
	)
}

export default ProductView
