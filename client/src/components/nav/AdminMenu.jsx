import {NavLink} from 'react-router-dom'

const AdminMenu = ({setShowAdminInfo, setManageProduct, setManageCategory}) => {
	const handleItemClick = (itemName) => {
		setShowAdminInfo(itemName === 'adminInfo' ? true : false)
		setManageProduct(itemName === 'manageProduct' ? true : false)
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
					onClick={() => handleItemClick('manageProduct')}
				>
					Create product
				</li>
				<li
					className='list-group-item pointer list-group-item-action'
					onClick={() => handleItemClick('manageCategory')}
				>
					Create category
				</li>
			</ul>
		</>
	)
}

export default AdminMenu
