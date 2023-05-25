const CategoryForm = ({
	handleSubmit,
	value,
	setValue,
	buttonText,
	showDeleteButton,
	handleDelete,
}) => {
	return (
		<>
			<div className='p-3'>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						className='form-control p-3'
						placeholder='Category name'
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
					<button className='btn btn-primary mt-3'>{buttonText}</button>
					{showDeleteButton && (
						<button onClick={handleDelete} className='btn btn-danger mt-3 ms-2'>
							Delete
						</button>
					)}
				</form>
			</div>
		</>
	)
}

export default CategoryForm
