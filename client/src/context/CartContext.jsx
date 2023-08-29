import {useState, createContext, useContext} from 'react'

const CartContext = createContext()

const CartProvider = ({children}) => {
	const [cart, setCart] = useState([])

	const getProductQuantity = (product) => {
		return cart.find((item) => item.id === product._id)?.cartQuantity || 0
	}

	const addToCart = (product) => {
		if (cart.find((item) => item._id === product._id) == null) {
			product.cartQuantity = 1
			console.log('null')
			const newCart = [...cart, product]
			setCart(newCart)
		} else increaseCartQuantity(product, 1)
	}

	const increaseCartQuantity = (product, amountToAdd = 1) => {
		setCart((currItems) => {
			if (currItems.find((item) => item._id === product._id) == null) {
				console.log('second')
				return [...currItems, {...product, cartQuantity: 1}]
			} else {
				return currItems.map((item) => {
					if (item._id === product._id) {
						console.log('third')
						return {
							...item,
							cartQuantity: parseInt(item.cartQuantity) + parseInt(amountToAdd),
						}
					} else {
						console.log('fourth')
						return item
					}
				})
			}
		})
	}

	const decreaseCartQuantity = (amountToRemove = false) => {
		setCart((currProducts) => {
			if (
				currProducts.find((product) => product.id === id)?.quanity === 1 &&
				amountToRemove == false
			) {
				return currProducts.filter((product) => product.id !== id)
			} else {
				return currProducts.map((product) => {
					if (product.id === id && product.quantity === amountToRemove) {
						return currProducts.filter((product) => product.id !== id)
					}
					if (product.id === id) {
						return {...product, quantity: product.quantity - amountToRemove}
					} else {
						return product
					}
				})
			}
		})
	}

	const removeFromCart = (product) => {
		setCart((currProducts) => {
			console.log('first')
			return currProducts.filter((item) => item._id !== product._id)
		})
	}

	const cartContext = {
		cart,
		setCart,
		getProductQuantity,
		increaseCartQuantity,
		decreaseCartQuantity,
		removeFromCart,
		addToCart,
	}

	return (
		<CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
	)
}

export {CartContext, CartProvider}
