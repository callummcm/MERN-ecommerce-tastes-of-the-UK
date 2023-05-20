import {NavLink} from 'react-router-dom'

const AdminMenu = ({setShowAdminInfo, setManageProduct, setManageCategory}) => {
	const handleItemClick = (itemName) => {
		setShowAdminInfo(itemName === 'adminInfo' ? true : false)
		setManageProduct(itemName === 'manageProduct' ? true : false)
		setManageCategory(itemName === 'manageCategory' ? true : false)
	}

	return (
		<>
			<div className='p-3 mt-2 mb-2 h4 bg-light text-center'>Admin Links</div>
			<ul className='list-group list-unstyled'>
				<li
					className='list-group-item pointer'
					onClick={() => handleItemClick('adminInfo')}
				>
					Admin Info
				</li>
				<li
					className='list-group-item pointer'
					onClick={() => handleItemClick('manageProduct')}
				>
					Create product
				</li>
				<li
					className='list-group-item pointer'
					onClick={() => handleItemClick('manageCategory')}
				>
					Create category
				</li>
			</ul>
		</>
	)
}

export default AdminMenu
