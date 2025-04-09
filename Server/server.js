import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import connectPostgres from './connect.js/db.js'

const port = 3000
const app = express()

app.use(cors())
app.use(express.json())

let sql = await connectPostgres()

app.post('/register', async (req, res) => {
	try {
		const { username, email, password } = req.body

		if (!username || !email || !password) {
			return res
				.status(400)
				.json({ message: 'Все поля обязательны для заполнения' })
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		await sql`
      INSERT INTO users (username, email, password)
      VALUES (${username}, ${email}, ${hashedPassword})
    `

		res.status(201).json({ message: 'Пользователь зарегистрирован' })
	} catch (err) {
		console.error('Ошибка при регистрации:', err)

		if (err.code === '23505') {
			return res
				.status(400)
				.json({ message: 'Имя пользователя или email уже заняты' })
		}

		res.status(500).json({ message: 'Ошибка сервера' })
	}
})

app.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: 'Все поля обязательны для заполнения' })
		}

		const user = await sql`SELECT * FROM users WHERE email = ${email}`
		if (user.length === 0) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}

		const isMatch = await bcrypt.compare(password, user[0].password)
		if (!isMatch) {
			return res.status(400).json({ message: 'Неверный пароль' })
		}

		res.status(200).json({ message: 'Авторизация успешна', user: user[0] })
	} catch (err) {
		console.error('Ошибка при авторизации:', err)
		res.status(500).json({ message: 'Ошибка сервера' })
	}
})

// Получить все заказы
app.get('/orders', async (req, res) => {
	try {
		const orders = await sql`SELECT * FROM orders`
		res.status(200).json(orders)
	} catch (err) {
		console.error('Ошибка при получении заказов:', err)
		res.status(500).json({ message: 'Ошибка сервера' })
	}
})

// Добавить новый заказ
app.post('/orders', async (req, res) => {
	try {
		const { title, price, description, img } = req.body
		const newOrder = await sql`
      INSERT INTO orders (title, price, description, img)
      VALUES (${title}, ${price}, ${description}, ${img})
      RETURNING *
    `
		res.status(201).json(newOrder[0])
	} catch (err) {
		console.error('Ошибка при добавлении заказа:', err)
		res.status(500).json({ message: 'Ошибка сервера' })
	}
})

// Удалить заказ
app.delete('/orders/:id', async (req, res) => {
	try {
		const { id } = req.params
		await sql`DELETE FROM orders WHERE id = ${id}`
		res.status(200).json({ message: 'Заказ удален' })
	} catch (err) {
		console.error('Ошибка при удалении заказа:', err)
		res.status(500).json({ message: 'Ошибка сервера' })
	}
})

// Обновить заказ
app.put('/orders/:id', async (req, res) => {
	try {
		const { id } = req.params
		const { title, price, description, img } = req.body
		const updatedOrder = await sql`
      UPDATE orders
      SET title = ${title}, price = ${price}, description = ${description}, img = ${img}
      WHERE id = ${id}
      RETURNING *
    `
		res.status(200).json(updatedOrder[0])
	} catch (err) {
		console.error('Ошибка при обновлении заказа:', err)
		res.status(500).json({ message: 'Ошибка сервера' })
	}
})

app.listen(port, () => {
	console.log('Сервер работает')
	sql()
})
