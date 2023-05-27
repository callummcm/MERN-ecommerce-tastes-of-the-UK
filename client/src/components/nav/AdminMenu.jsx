import {NavLink} from 'react-router-dom'

const AdminMenu = ({
	setShowAdminInfo,
	setCreateProduct,
	setManageProducts,
	setManageCategory,
}) => {
	const handleItemClick = (itemName) => {
		setShowAdminInfo(itemName === 'adminInfo' ? true : false)
		setCreateProduct(itemName === 'createProduct' ? true : false)
		setManageProducts(itemName === 'manageProducts' ? true : false)
		setManageCategory(itemName === 'manageCategory' ? true : false)
	}

	return (
		<>
			<div className='p-3 mt-2 mb-2 h4 bg-light'>Admin Links</div>
			<ul className='list-group'>
				<li
					className='list-group-item pointer list-group-item-action'
					onClick={() => handleItemClick('adminInfo')}
				>
					Admin Info
				</li>
				<li
					className='list-group-item pointer list-group-item-action'
					onClick={() => handleItemClick('createProduct')}
				>
					Create product
				</li>
				<li
					className='list-group-item pointer list-group-item-action'
					onClick={() => handleItemClick('manageProducts')}
				>
					Manage products
				</li>
				<li
					className='list-group-item pointer list-group-item-action'
					onClick={() => handleItemClick('manageCategory')}
				>
					Create/Manage categories
				</li>
			</ul>
		</>
	)
}

export default AdminMenu
