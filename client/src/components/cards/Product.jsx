import moment from 'moment'

const Product = ({product}) => {
	const {image, _id, name, description, createdAt, updatedAt} = product
	const truncatedDescription =
		description.slice(0, 50) + (description.length > 50 ? '...' : '')

	return (
		<>
			<div
				className='card'
				style={{
					maxWidth: '250px',
					minWidth: '250px',
					maxHeight: '500px',
					minHeight: '500px',
				}}
			>
				{image && (
					<img
						src={`${import.meta.env.VITE_API}/product/image/${_id}`}
						alt={name}
						style={{width: '100%', objectFit: 'cover'}}
						className='img img-fluid rounded-top'
					/>
				)}
				<div className='card-body'>
					<h5 className='card-title'>{name}</h5>
					<p className='card-text'>{truncatedDescription}</p>
				</div>
				<ul className='list-group list-group-flush'>
					{createdAt && (
						<li className='list-group-item'>
							<p>Created: {moment(createdAt).format('Do MMMM YYYY')}</p>
						</li>
					)}
					{updatedAt && (
						<li className='list-group-item'>
							<p>Updated: {moment(updatedAt).format('Do MMMM YYYY')}</p>
						</li>
					)}
					<li className='list-group-item'>Dapibus ac facilisis in</li>
					<li className='list-group-item'>Vestibulum at eros</li>
				</ul>
				<div className='card-body'>
					<a href='#' className='card-link'>
						Card link
					</a>
					<a href='#' className='card-link'>
						Another link
					</a>
				</div>
			</div>
		</>
	)
}

export default Product
