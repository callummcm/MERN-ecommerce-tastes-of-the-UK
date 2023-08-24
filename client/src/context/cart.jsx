import {useState, createContext, useContext} from 'react'

const CartContext = createContext()

const CartProvider = ({children}) => {
	const [cart, setCart] = useState([])

	// const contentContext = {
	// 	categoryList,
	// 	featuredProducts,
	// }

	return (
		<CartContext.Provider value={[cart, setCart]}>
			{children}
		</CartContext.Provider>
	)
}

const useCart = () => useContext(CartContext)

export {useCart, CartProvider}
