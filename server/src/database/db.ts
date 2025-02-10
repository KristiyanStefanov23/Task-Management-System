import { Sequelize } from 'sequelize-typescript'
import User from '../models/users'
import Task from '../models/tasks'

const DATABASE_URL = `${process.env.DB_DIALECT}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const sequelize = new Sequelize(DATABASE_URL, {
	dialect: 'postgres',
	define: { freezeTableName: true },
	models: [User, Task],
})

export const initDb = async () => {
	try {
		await sequelize.authenticate()
		console.log('Database connected!')

		await sequelize.query(
			`CREATE SCHEMA IF NOT EXISTS "TaskManagementSystem"`
		)

		await sequelize.sync({ alter: true, schema: 'TaskManagementSystem' })
		console.log('Database synchronized!')
	} catch (error) {
		console.error('Error connecting to database:', error)
	}
}

export default sequelize
