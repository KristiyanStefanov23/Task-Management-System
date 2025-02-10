import { Router } from 'express'
import {
	createTask,
	deleteTask,
	editTask,
	getAllTasks,
	getTask,
	getTaskStats,
} from '../controllers/taskController'
import { falliableRoute } from '../lib/errors'
import { celebrate, Segments } from 'celebrate'
import schemas from '../validations/celebrateSchemas'
import { authenticateUser } from '../middleware/auth'

const taskRouter = Router()

taskRouter.post(
	'/',
	celebrate({ [Segments.BODY]: schemas['post-task'] }),
	falliableRoute.bind(null, createTask)
)

taskRouter.get(
	'/',
	falliableRoute.bind(null, authenticateUser),
	falliableRoute.bind(null, getAllTasks)
)
taskRouter.get('/:id', falliableRoute.bind(null, getTask))
taskRouter.patch('/:id', falliableRoute.bind(null, editTask))
taskRouter.delete('/:id', falliableRoute.bind(null, deleteTask))
taskRouter.get(
	'/stats',
	falliableRoute.bind(null, authenticateUser),
	falliableRoute.bind(null, getTaskStats)
)

export default taskRouter
