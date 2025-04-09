import postgres from 'postgres'

const connectPostgres = async () => {
	try {
		const sql = postgres({
			host: 'localhost',
			port: 5432,
			database: 'postgres',
			username: 'postgres',
			password: '1234',
		})

		// Создание таблицы, если её нет
		await sql`
			CREATE TABLE IF NOT EXISTS users (
				id SERIAL PRIMARY KEY,
				username VARCHAR(50) UNIQUE NOT NULL,
				email VARCHAR(100) UNIQUE NOT NULL,
				password VARCHAR(255) NOT NULL
			)
		`
		await sql`
	CREATE TABLE IF NOT EXISTS orders (
		id SERIAL PRIMARY KEY,
		title VARCHAR(255) NOT NULL,
		price NUMERIC(10, 2) NOT NULL,
		description TEXT,
		img VARCHAR(255)
	)
`

		// Данные для вставки
		const orderData = [
			{
				title: 'Дверь межкомнатная Остиум U8 ДГ',
				price: 50,
				description: 'Простота линий, идеальные пропорции...',
				img: '/public/img/door1.png', // Указываем строковый путь
			},
			{
				title: 'Дверь межкомнатная Остиум Р 20 ДГ',
				price: 400,
				description: 'Модели этой коллекции стали...',
				img: '/public/img/door2.png',
			},
			{
				title: 'Дверь межкомнатная Carda ТОСКАНА',
				price: 300,
				description: 'Простота линий, идеальные пропорции...',
				img: '/public/img/door3.png',
			},
			{
				id: 4,
				title: 'Дверь межкомнатная Profil Doors 1LK',
				price: 200,
				description:
					'Серия LK - это коллекция каркасных дверей в глянцевом покрытии, разработанном в Германии на основе новейших разработок.',
				img: '/public/img/door4.png',
			},
			{
				id: 5,
				title: 'Дверь межкомнатная Profil Doors 42ZN',
				price: 100,
				description:
					'Серия LK - это коллекция каркасных дверей в глянцевом покрытии, разработанном в Германии на основе новейших разработок.',
				img: '/public/img/door5.png',
			},
			{
				id: 6,
				title: 'Дверь межкомнатная Aurum Pd 5 Палладий',
				price: 500,
				description:
					'Основа двери - МДФ ”Swiss krono” (Швейцария), толщиной 6мм. Сотовое наполнение',
				img: '/public/img/door6.png',
			},
			{
				id: 7,
				title: 'Дверь межкомнатная Aurum Pd 5 Палладий',
				price: 500,
				description:
					'Основа двери - МДФ ”Swiss krono” (Швейцария), толщиной 6мм. Сотовое наполнение',
				img: '/public/img/door6.png',
			},
		]

		// Функция загрузки данных
		const loadData = async () => {
			try {
				for (const order of orderData) {
					// Проверяем, есть ли уже такая запись в БД
					const existingOrder = await sql`
						SELECT * FROM orders WHERE title = ${order.title}
					`
					if (existingOrder.length === 0) {
						await sql`
							INSERT INTO orders (title, price, description, img)
							VALUES (${order.title}, ${order.price}, ${order.description}, ${order.img})
						`
					}
				}
				console.log('Данные успешно загружены в базу данных')
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		}

		await loadData()

		console.log(`PostgresDB connected and ensured table exists`)
		return sql
	} catch (error) {
		console.error(`Error connection to mongoDB: ${error.message}`)
		process.exit(1)
	}
}

export default connectPostgres
