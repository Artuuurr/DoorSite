import React from 'react'

const ReportModal = ({ show, onClose }) => {
	if (!show) return null

	// Генерация случайных данных для отчета (6–7 дверей)
	const generateRandomDoors = () => {
		const numDoors = Math.floor(Math.random() * 2) + 6 // 6 или 7 дверей
		return Array.from({ length: numDoors }, (_, index) => ({
			id: index + 1,
			name: `Дверь модель ${Math.floor(Math.random() * 1000)}`,
			sold: Math.floor(Math.random() * 100) + 1, // Количество проданных дверей
			stock: Math.floor(Math.random() * 50), // Остаток на складе
			total: Math.floor(Math.random() * 500) + 100, // Цена одной двери
		}))
	}

	const doors = generateRandomDoors()

	// Стили
	const styles = {
		modalOverlay: {
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		modalContent: {
			backgroundColor: 'white',
			padding: '20px',
			borderRadius: '8px',
			maxWidth: '600px',
			width: '100%',
			boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
		},
		table: {
			width: '100%',
			borderCollapse: 'collapse',
			marginTop: '10px',
		},
		th: {
			backgroundColor: '#007bff',
			color: 'white',
			padding: '8px',
			border: '1px solid #ddd',
			textAlign: 'left',
		},
		td: {
			padding: '8px',
			border: '1px solid #ddd',
		},
		button: {
			marginTop: '10px',
			padding: '8px 16px',
			backgroundColor: '#007bff',
			color: 'white',
			border: 'none',
			borderRadius: '4px',
			cursor: 'pointer',
		},
		buttonHover: {
			backgroundColor: '#0056b3',
		},
	}

	return (
		<div style={styles.modalOverlay} onClick={onClose}>
			<div style={styles.modalContent} onClick={e => e.stopPropagation()}>
				<h2>Отчет о продажах</h2>
				<table style={styles.table}>
					<thead>
						<tr>
							<th style={styles.th}>Название двери</th>
							<th style={styles.th}>Продано</th>
							<th style={styles.th}>Остаток</th>
							<th style={styles.th}>Сумма ($)</th>
						</tr>
					</thead>
					<tbody>
						{doors.map(door => (
							<tr key={door.id}>
								<td style={styles.td}>{door.name}</td>
								<td style={styles.td}>{door.sold}</td>
								<td style={styles.td}>{door.stock}</td>
								<td style={styles.td}>{door.sold * door.total}</td>
							</tr>
						))}
					</tbody>
				</table>
				<button
					style={styles.button}
					onMouseEnter={e =>
						(e.target.style.backgroundColor =
							styles.buttonHover.backgroundColor)
					}
					onMouseLeave={e =>
						(e.target.style.backgroundColor = styles.button.backgroundColor)
					}
					onClick={onClose}
				>
					Закрыть
				</button>
			</div>
		</div>
	)
}

export default ReportModal
