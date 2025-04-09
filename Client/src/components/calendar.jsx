import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import ruLocale from '@fullcalendar/core/locales/ru'
import Modal from 'react-modal'

// Установите элемент для модалок
Modal.setAppElement('#root')

const initialEvents = [
	{ title: 'Событие 1', date: '2024-10-03', color: 'blue' },
	{ title: 'Событие 2', date: '2024-10-07', color: 'green' },
	{ title: 'Событие 3', date: '2024-10-13', color: 'orange' },
]

const Calendar = () => {
	const [events, setEvents] = useState(initialEvents)
	const [newEvent, setNewEvent] = useState({ title: '', date: '', color: '' })
	const [modalIsOpen, setModalIsOpen] = useState(false)

	// Обработчик изменения формы
	const handleInputChange = e => {
		const { name, value } = e.target
		setNewEvent({ ...newEvent, [name]: value })
	}

	// Обработчик добавления события
	const handleAddEvent = e => {
		e.preventDefault()
		if (newEvent.title && newEvent.date && newEvent.color) {
			setEvents([...events, newEvent])
			setNewEvent({ title: '', date: '', color: '' }) // Очистка формы после добавления
			setModalIsOpen(false) // Закрыть модалку
		} else {
			alert('Заполните все поля!')
		}
	}

	const handleAddButtonClick = () => {
		setNewEvent({ title: '', date: '', color: '' }) // Очистка полей формы
		setModalIsOpen(true) // Открыть модалку
	}

	return (
		<section className='calendar'>
			<div className='calendarTitel'>
				<h2 style={{ fontSize: '40px', color: '#f83437' }}>
					Календарь событий
				</h2>
				<button className='modalBtn' onClick={handleAddButtonClick}>
					Добавить событие
				</button>
			</div>

			{/* Модалка для добавления события */}
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				style={{
					content: {
						top: '50%',
						left: '50%',
						right: 'auto',
						bottom: 'auto',
						transform: 'translate(-50%, -50%)',
						width: '300px',
						padding: '20px',
						borderRadius: '8px',
						zIndex: 1000,
					},
					overlay: {
						backgroundColor: 'rgba(0, 0, 0, 0.5)', // Затемнение фона
						zIndex: 999,
					},
				}}
			>
				<h2 style={{ fontSize: '18px' }}>Добавить событие</h2>
				<form onSubmit={handleAddEvent}>
					<input
						type='text'
						name='title'
						placeholder='Название события'
						value={newEvent.title}
						onChange={handleInputChange}
						style={{ width: '100%', marginBottom: '10px' }}
					/>
					<input
						type='date'
						name='date'
						value={newEvent.date}
						onChange={handleInputChange}
						style={{ marginBottom: '10px', width: '100%' }}
					/>
					<input
						type='color'
						name='color'
						value={newEvent.color}
						onChange={handleInputChange}
						style={{ marginBottom: '10px', width: '100%' }}
					/>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<button type='submit'>Добавить</button>
						<button type='button' onClick={() => setModalIsOpen(false)}>
							Закрыть
						</button>
					</div>
				</form>
			</Modal>

			<div className={`calendar-wrapper ${modalIsOpen ? 'disabled' : ''}`}>
				<FullCalendar
					plugins={[dayGridPlugin, timeGridPlugin]}
					initialView='dayGridMonth'
					events={events}
					localization={ruLocale}
					locale='ru'
					firstDay={1}
				/>
			</div>
		</section>
	)
}

export default Calendar
