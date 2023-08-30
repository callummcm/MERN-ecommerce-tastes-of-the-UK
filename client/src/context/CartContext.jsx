import {useState, createContext, useContext, useEffect} from 'react'
import {useLocalStorage} from '../hooks/useLocalStorage'

const CartContext = createContext()

const CartProvider = ({children}) => {
	const [cart, setCart] = useLocalStorage('Cart', [])

	const getProductQuantity = (product) => {
		return cart.find((item) => item.id === product._id)?.cartQuantity || 0
	}

	const addToCart = (product) => {
		if (cart.find((item) => item._id === product._id) == null) {
			product.cartQuantity = 1
			const newCart = [...cart, product]
			setCart(newCart)
		} else updateCartQuantity(product, 1)
	}

	const updateCartQuantity = (product, amountToAdd = 1) => {
		setCart((currItems) => {
			if (currItems.find((item) => item._id === product._id) == null) {
				return [...currItems, {...product, cartQuantity: 1}]
			} else {
				return currItems.map((item) => {
					if (item._id === product._id) {
						return {
							...item,
							cartQuantity: parseInt(item.cartQuantity) + parseInt(amountToAdd),
						}
					} else {
						return item
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
		updateCartQuantity,
		removeFromCart,
		addToCart,
	}

	return (
		<CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
	)
}

export {CartContext, CartProvider}
