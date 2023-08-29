import {useNavigate} from 'react-router-dom'
import Jumbotron from '../../components/cards/Jumbotron'
import {CartContext} from '../../context/CartContext'
import {useContext} from 'react'

const Cart = () => {
	//const [cart, setCart] = useCart().cartState
	const {cart, setCart, increaseCartQuantity, removeFromCart} =
		useContext(CartContext)

	const navigate = useNavigate()
	console.log(cart)

	// const removeFromCart = () => {
	// 	//
	// }

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
									style={{maxWidth: 540}}
								>
									<div className='row g-0'>
										<div className='col-md-4'>
											<img
												src={`${import.meta.env.VITE_API}/product/image/${
													product._id
												}`}
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
											</div>
											<div className='input-group m-1 mt-auto d-flex flex-row-reverse align-items-baseline'>
												<div className='d-flex me-2'>
													<button
														className='btn btn-primary col m-1'
														onClick={() => {
															increaseCartQuantity(product)
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
													value={product.cartQuantity}
													//onChange={(e) => setQuantity(e.target.value)}
													min='1'
													style={{maxWidth: '50px', maxHeight: '40px'}}
												/>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className='col-md-3'>Total / Adress / Payments</div>
						<div className='col-md-1'></div>
					</div>
				</div>
			)}
		</>
	)
}

export default Cart
