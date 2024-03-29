import {useNavigate} from 'react-router-dom'
import Jumbotron from '../../components/cards/Jumbotron'
import {CartContext} from '../../context/CartContext'
import {useAuth} from '../../context/auth'
import {useContext, useEffect, useState} from 'react'
import CartProductCard from '../../components/cards/CartProductCard'

const Cart = () => {
	//const [cart, setCart] = useCart().cartState
	const {cart, setCart} = useContext(CartContext)
	const [auth, setAuth] = useAuth()
	const [cartTotal, setCartTotal] = useState(0)

	const navigate = useNavigate()

	useEffect(() => {
		if (auth?.user) {
			console.log(auth.user)
			const {name, email, shippingAddress} = auth.user
		}
	}, [auth?.user])

	useEffect(() => {
		let total = 0
		cart.map((item) => {
			total += item.price * item.cartQuantity
		})
		setCartTotal(total)
	}, [cart])

	return (
		<>
			<Jumbotron
				title={`Hello`}
				subtitle={
					cart?.length > 0 ? `${cart.length} items in cart` : 'Cart is empty'
				}
			/>

			<div className='container-fluid'>
				<div className='row'>
					<div className='col-md-12'>
						<div className='p-3 mt-2 mb-2 h4 bg-light text-center'>
							{cart?.length > 0 ? (
								'My Cart'
							) : (
								<div>
									<button className='btn' onClick={() => navigate('/shop')}>
										Back to shop
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			{cart?.length > 0 && (
				<div className='container'>
					<div className='row'>
						<div className='col-md-1'></div>
						<div className='col-md-7'>
							{cart?.map((product) => (
								<div
									key={product._id}
									className='card mb-3'
									// style={{maxWidth: 540}}
								>
									<CartProductCard product={product} />
								</div>
							))}
						</div>
						<div className='col-md-3'>
							<h4>Cart Summary</h4>
							Total / Adress / Payments
							<hr />
							<h6>Total: ${cartTotal}</h6>
							{auth?.user?.shippingAddress ? (
								<>
									<div className='mb-3'>
										<hr />
										<h4>Delivery address:</h4>
										<h5>{auth?.user?.shippingAddress}</h5>
									</div>
									<button
										className='btn btn-outline-warning'
										onClick={() => navigate('/dashboard')}
									>
										Update address
									</button>
								</>
							) : (
								<div className='mb-3'>
									{auth?.token ? (
										<button
											className='btn btn-outline-warning'
											onClick={() => navigate('/dashboard')}
										>
											Add delivery address
										</button>
									) : (
										<button className='btn btn-outline-danger mt-3'>
											Login to checkout
										</button>
									)}
								</div>
							)}
						</div>
						<div className='col-md-1'></div>
					</div>
				</div>
			)}
		</>
	)
}

export default Cart
