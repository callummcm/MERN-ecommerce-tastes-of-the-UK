import {Badge} from 'antd'
import {useEffect, useState} from 'react'

const ProductCard = ({product}) => {
	const {_id, name, description, price, inStock, createdAt, updatedAt} = product

	const [isInStock, setIsInStock] = useState('')
	const [shortName, setShortName] = useState('')

	useEffect(() => {
		if (inStock) setIsInStock('In stock')
		else setIsInStock('Out of stock')

		setShortName(name.slice(0, 30) + (name.length > 30 ? '...' : ''))
	}, [])

	const handleViewProduct = () => {
		console.log(`go to: ${_id} product page`)
	}

	return (
		<>
			<div className='card mb-3 hoverable'>
				<div onClick={handleViewProduct} className='pointer'>
					<Badge.Ribbon text={`${isInStock}`} color={inStock ? 'green' : 'red'}>
						<img
							src={`${import.meta.env.VITE_API}/product/image/${_id}`}
							alt={shortName}
							style={{height: '200px', objectFit: 'cover'}}
							className='img img-fluid rounded-top card-img-top'
						/>
					</Badge.Ribbon>
					<div className='card-body'>
						<h5>{shortName}</h5>
						<p className='card-text text-success'>
							{price?.toLocaleString('en-NZ', {
								style: 'currency',
								currency: 'NZD',
							})}
						</p>
					</div>
				</div>
				<div className='d-flex justify-content-between'>
					<button className='btn btn-primary col card-button m-3'>
						Add to Cart
					</button>
				</div>
			</div>
		</>
	)
}

export default ProductCard
