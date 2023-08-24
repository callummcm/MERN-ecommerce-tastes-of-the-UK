import {useNavigate} from 'react-router-dom'
import Jumbotron from '../../components/cards/Jumbotron'
import {useCart} from '../../context/cart'

const Cart = () => {
	const [cart, setCart] = useCart()

	const navigate = useNavigate()

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

			{cart?.length > 1 && (
				<div className='container'>
					<div className='row'>
						<div className='col-md-9'>
							{cart?.map((product) => (
								<div key={product._id}>{product.name}</div>
							))}
						</div>
						<div className='col-md-3'>Total / Adress / Payments</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Cart
