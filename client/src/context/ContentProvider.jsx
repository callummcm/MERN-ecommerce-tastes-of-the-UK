import React, {useState, useEffect} from 'react'
import axios from 'axios'

const ContentContext = React.createContext({})

const ContentProvider = ({children}) => {
	const [productList, setProductList] = useState([])
	const [categoryList, setCategoryList] = useState([])
	const [featuredProducts, setFeaturedProducts] = useState([])

	const fetchProductsAndCategories = async () => {
		try {
			const {data: products} = await axios.get('/all-products')
			setProductList(products)
			const {data: categories} = await axios.get('/categories')
			setCategoryList(categories)
		} catch (err) {
			console.log(err)
		}
	}

	const fetchFeaturedProducts = async () => {
		try {
			const {data: featuredProducts} = await axios.get('/featured-products')
			setFeaturedProducts(featuredProducts)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		fetchProductsAndCategories()
		fetchFeaturedProducts()
	}, [])

	const contentContext = {
		productList,
		categoryList,
		featuredProducts,
	}

	return (
		<ContentContext.Provider value={contentContext}>
			{children}
		</ContentContext.Provider>
	)
}

export {ContentContext, ContentProvider}
