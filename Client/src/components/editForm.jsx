import React, { useState } from 'react'

const EditForm = ({ order, onUpdate, onCancel }) => {
	const [updatedOrder, setUpdatedOrder] = useState(order)

	const handleSubmit = e => {
		e.preventDefault()
		if (
			updatedOrder.title &&
			updatedOrder.price &&
			updatedOrder.description &&
			updatedOrder.img
		) {
			onUpdate(updatedOrder)
		} else {
			alert('Пожалуйста, заполните все поля.')
		}
	}

	return (
		<div className='modal-overlay' onClick={onCancel}>
			<form
				onSubmit={handleSubmit}
				className='edit-form'
				onClick={e => e.stopPropagation()}
			>
				<h3>Редактировать заказ</h3>
				<input
					type='text'
					placeholder='Название'
					value={updatedOrder.title}
					onChange={e =>
						setUpdatedOrder({ ...updatedOrder, title: e.target.value })
					}
				/>
				<input
					type='number'
					placeholder='Цена'
					value={updatedOrder.price}
					onChange={e =>
						setUpdatedOrder({
							...updatedOrder,
							price: parseFloat(e.target.value),
						})
					}
				/>
				<input
					type='text'
					placeholder='Описание'
					value={updatedOrder.description}
					onChange={e =>
						setUpdatedOrder({ ...updatedOrder, description: e.target.value })
					}
				/>
				<input
					type='text'
					placeholder='Ссылка на изображение'
					value={updatedOrder.img}
					onChange={e =>
						setUpdatedOrder({ ...updatedOrder, img: e.target.value })
					}
				/>
				<button type='submit'>Сохранить</button>
				<button type='button' onClick={onCancel}>
					Отмена
				</button>
			</form>
		</div>
	)
}

export default EditForm
