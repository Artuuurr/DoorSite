import React, { useState, useEffect } from 'react'
import deleted from '../../public/img/del.png'
import edit from '../../public/img/edit.png'
import AddForm from './addForm'
import EditForm from './editForm'
import ReportModal from './ReportModal'

const Orders = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [orders, setOrders] = useState([])
	const [filteredOrders, setFilteredOrders] = useState([])
	const [show, setShow] = useState(false)
	const [editingOrder, setEditingOrder] = useState(null)
	const [showReport, setShowReport] = useState(false)

	const fetchOrders = async () => {
		try {
			const response = await fetch('http://localhost:3000/orders')
			const data = await response.json()
			setOrders(data)
			setFilteredOrders(data)
		} catch (error) {
			console.error('Ошибка загрузки заказов:', error)
		}
	}

	useEffect(() => {
		fetchOrders()
	}, [])

	const handleSearch = () => {
		const lowerCaseQuery = searchQuery.toLowerCase()
		const results = orders.filter(
			order =>
				order.title.toLowerCase().includes(lowerCaseQuery) ||
				order.description.toLowerCase().includes(lowerCaseQuery) ||
				order.price.toString().includes(lowerCaseQuery)
		)
		setFilteredOrders(results)
	}

	const closeForm = () => {
		setShow(false)
	}

	// Функция добавления заказа
	const addOrder = async newOrder => {
		try {
			const response = await fetch('http://localhost:3000/orders', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newOrder),
			})
			if (response.ok) {
				fetchOrders() // Перезагружаем данные из БД
				setShow(false)
			} else {
				console.error('Ошибка при добавлении заказа')
			}
		} catch (error) {
			console.error('Ошибка сервера при добавлении:', error)
		}
	}

	// Функция удаления заказа
	const deleteOrder = async id => {
		try {
			const response = await fetch(`http://localhost:3000/orders/${id}`, {
				method: 'DELETE',
			})
			if (response.ok) {
				fetchOrders() // Перезагружаем данные после удаления
			} else {
				console.error('Ошибка при удалении заказа')
			}
		} catch (error) {
			console.error('Ошибка сервера при удалении:', error)
		}
	}

	// Функция обновления заказа
	const updateOrder = async updatedOrder => {
		try {
			const response = await fetch(
				`http://localhost:3000/orders/${updatedOrder.id}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(updatedOrder),
				}
			)
			if (response.ok) {
				fetchOrders() // Перезагружаем данные после обновления
				setEditingOrder(null)
			} else {
				console.error('Ошибка при обновлении заказа')
			}
		} catch (error) {
			console.error('Ошибка сервера при обновлении:', error)
		}
	}

	return (
		<section className='orders'>
			<div className='search'>
				<input
					type='text'
					placeholder='Поиск...'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>
				<button onClick={handleSearch}>Поиск</button>
				<button onClick={() => setShow(true)}>Добавить</button>
				<button onClick={() => setShowReport(true)}>Отчет</button>
			</div>
			<div className='orders-grid'>
				{filteredOrders.map(order => (
					<div className='order-card' key={order.id}>
						<div className='button-container'>
							<button className='edit' onClick={() => setEditingOrder(order)}>
								<img src={edit} alt='Редактировать' />
							</button>
							<button className='del' onClick={() => deleteOrder(order.id)}>
								<img src={deleted} alt='Удалить' />
							</button>
						</div>
						<img src={order.img} alt={order.title} />
						<h3 className='titleCards'>{order.title}</h3>
						<h4 className='priceCards'>Цена: {order.price}$</h4>
						<p className='textCards'>{order.description}</p>
					</div>
				))}
			</div>
			<AddForm onAdd={addOrder} show={show} close={closeForm} />
			{editingOrder && (
				<EditForm
					order={editingOrder}
					onUpdate={updateOrder}
					onCancel={() => setEditingOrder(null)}
				/>
			)}
			<ReportModal show={showReport} onClose={() => setShowReport(false)} />
		</section>
	)
}

export default Orders
