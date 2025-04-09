import React, { useState } from 'react'

const AddForm = ({ onAdd, show, close }) => {
	const [newOrder, setNewOrder] = useState({
		title: '',
		price: '',
		description: '',
		img: null,
	}) // Состояние для нового заказа

	// Функция для обработки отправки формы
	const handleSubmit = e => {
		e.preventDefault() // Предотвращаем перезагрузку страницы
		if (
			newOrder.title &&
			newOrder.price &&
			newOrder.description &&
			newOrder.img
		) {
			onAdd(newOrder) // Вызываем функцию добавления из родительского компонента
			setNewOrder({
				title: '',
				price: '',
				description: '',
				img: '',
				id: Date.now(),
			}) // Сбрасываем форму
		} else {
			alert('Пожалуйста, заполните все поля.') // Проверка на заполнение полей
		}
	}

	return (
		<>
			{show && (
				<div className='modal-overlay' onClick={close}>
					<form
						onSubmit={handleSubmit}
						className='add-form'
						onClick={e => e.stopPropagation()}
					>
						<h3>Добавить новый заказ</h3>
						<input
							type='text'
							placeholder='Название'
							value={newOrder.title}
							onChange={e =>
								setNewOrder({ ...newOrder, title: e.target.value })
							} // Обновляем название
						/>
						<input
							type='number'
							placeholder='Цена'
							value={newOrder.price}
							onChange={e =>
								setNewOrder({ ...newOrder, price: e.target.value })
							} // Обновляем цену
						/>
						<input
							type='text'
							placeholder='Описание'
							value={newOrder.description}
							onChange={e =>
								setNewOrder({ ...newOrder, description: e.target.value })
							} // Обновляем описание
						/>
						<input
							type='text'
							placeholder='Ссылка на изображение'
							value={newOrder.img}
							onChange={e => setNewOrder({ ...newOrder, img: e.target.value })} // Обновляем изображение
						/>
						<button type='submit'>Добавить</button>{' '}
						{/* Кнопка для добавления заказа */}
					</form>
				</div>
			)}
		</>
	)
}

export default AddForm
