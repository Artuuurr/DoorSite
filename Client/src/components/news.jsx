import React from 'react'
import new1 from '../../public/img/new1.png'
import new2 from '../../public/img/new2.png'
import new3 from '../../public/img/new3.png'

const newsData = [
	{
		title: 'Введение новой линейки дверей',
		date: '01 Октября 2024',
		img: new1,
		text:
			'Мы рады сообщить, что с этого месяца в нашем производственном цехе стартует работа новой линии по производству межкомнатных дверей. Это позволит увеличить объемы производства и сократить время на выполнение заказов.',
	},
	{
		title: 'Изменения в графике работы',
		date: '05 Октября 2024',
		img: new2,
		text:
			'Уважаемые сотрудники! Обращаем ваше внимание на изменения в графике работы в связи с предстоящими праздниками.',
	},
	{
		title: 'Красочные новинки',
		date: '10 Октября 2024',
		img: new3,
		text:
			'Уважаемые коллеги! Мы запускаем программу курсов повышения квалификации на тему современных технологий обработки и отделки древесины. Курсы будут проходить каждую среду с 15:00 до 17:00. Запись открыта до конца недели. ',
	},
]

const News = () => {
	const today = new Date().toLocaleDateString('ru-RU', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return (
		<section className='news'>
			<div className='titleNews'>
				<h2 style={{ fontSize: '40px', color: '#f83437' }}>Новости</h2>
				<p className='undertitle'>{today}</p>
			</div>
			<div className='news-grid'>
				{newsData.map((news, index) => (
					<article key={index}>
						<img src={news.img} alt={news.title} />
						<p className='dateNew'>{news.date}</p>
						<h3
							className='titleNew'
							style={{ color: '#126ab4', fontSize: '20px', paddingTop: '18px' }}
						>
							{news.title}
						</h3>
						<p className='textNew'>{news.text}</p>
					</article>
				))}
			</div>
		</section>
	)
}

export default News
