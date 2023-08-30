import {useEffect, useState} from 'react'
import {CartContext} from '../../context/CartContext'
import {useContext} from 'react'

const CartProductCard = ({product}) => {
	const [quantity, setQuantity] = useState(1)

	const {cart, setCart, updateCartQuantity, removeFromCart} =
		useContext(CartContext)

	useEffect(() => {
		setQuantity(product.cartQuantity)
	}, [])

	const handleUpdateQuantity = () => {
		const quantityToChange = parseInt(quantity) - parseInt(product.cartQuantity)
		updateCartQuantity(product, quantityToChange)
	}

	const handleQuantityChange = (e) => {
		const newQuantity = parseInt(e.target.value)
		if (Number.isInteger(newQuantity) && newQuantity > 0)
			setQuantity(newQuantity)
		else setQuantity(product.cartQuantity)
	}

	return (
		<>
			<div className='row g-0'>
				<div className='col-md-4'>
					<img
						src={`${import.meta.env.VITE_API}/product/image/${product._id}`}
						alt={product.name}
						style={{
							height: '200px',
							width: '100%',
							borderTopRightRadius: '0px',
							objectFit: 'cover',
						}}
						className='img img-fluid rounded-top card-img-top'
					/>
				</div>
				<div className='col-md-8 d-flex flex-column justify-content-between'>
					<div className='card-body'>
						<h5 className='card-title'>{product.name}</h5>
						<p className='card-text'>
							{`${product.description?.substring(0, 50)}...`}
						</p>
						<p className='card-text'>
							{product.price?.toLocaleString('en-NZ', {
								style: 'currency',
								currency: 'NZD',
							})}
						</p>
					</div>
					<div className='input-group m-1 mt-auto d-flex flex-row-reverse align-items-baseline'>
						<div className='d-flex me-2'>
							<button
								className='btn btn-primary col m-1'
								onClick={() => {
									handleUpdateQuantity()
								}}
							>
								Update
							</button>
							<button
								className='btn btn-danger col m-1'
								onClick={() => {
									removeFromCart(product)
								}}
							>
								X
							</button>
						</div>
						<input
							type='number'
							className='form-control form-control-sm text-center m-1'
							value={quantity}
							onChange={(e) => handleQuantityChange(e)}
							min='1'
							style={{maxWidth: '50px', maxHeight: '40px'}}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default CartProductCard
