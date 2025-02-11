import { Response } from 'express'
import {
	TaskAttributes,
	TaskCreationAttributes,
	TaskStatus,
} from 'Task-Management-System-common'
import {
	RequestBody,
	RequestBodyWithAuth,
	ResponseSuccessErrBody,
} from '../types'
import Task from '../models/tasks'
import User from '../models/users'
import { col, fn } from 'sequelize'

type UserTaskCount = {
	user: string
	count: number
}

export type TaskAnalytics = {
	statusCounts: { [key in TaskStatus]: number }
	userTaskCounts: UserTaskCount[]
}

export async function getAllTasks(req: RequestBodyWithAuth, res: Response) {
	if (!req.user) return res.status(401).send({ message: 'Unauthorized' })

	const options = {
		...(req.user.admin ? {} : { where: { assignedUserId: req.user.id } }),
		include: { model: User, as: 'assignedUser', attributes: ['name'] },
	}

	const tasks = await Task.findAll(options)
	const result = tasks.map(
		({ id, title, description, status, assignedUserId, assignedUser }) => {
			return {
				id,
				title,
				description,
				status,
				assignedUserId,
				assignedUserName: assignedUser ? assignedUser.name : null,
			}
		}
	)

	res.status(200).json(result)
}

export async function getTask(req: RequestBodyWithAuth, res: Response) {
	if (!req.user) return res.status(401).send({ message: 'Unauthorized' })
	const { id } = req.params

	const task = await Task.findByPk(id, {
		include: { model: User, as: 'assignedUser', attributes: ['name'] },
	})
	if (!task) return res.status(404).send({ message: "Couldn't find Task" })

	res.status(200).json(task)
}

export async function createTask(
	req: RequestBody<TaskCreationAttributes>,
	res: ResponseSuccessErrBody
) {
	Task.create({
		title: req.body.title,
		description: req.body.description,
		assignedUserId: req.body.assignedUserId,
	})

	return res.status(201).send({ success: true })
}

export async function deleteTask(
	req: RequestBodyWithAuth & Pick<TaskAttributes, 'id'>,
	res: ResponseSuccessErrBody
) {
	if (!req.user || !req.user.admin)
		return res.status(401).send({ message: 'Unauthorized' })
	const task = await Task.findByPk(req.params.id)
	if (!task) return res.status(404).send({ message: "Couldn't find task" })
	try {
		await task.destroy()
		res.status(200).send({ success: true })
	} catch (error) {
		res.status(500).send({ message: 'Error deleting task' })
	}
}

export async function editTask(
	req: RequestBody<TaskCreationAttributes, { id: string }> &
		RequestBodyWithAuth,
	res: ResponseSuccessErrBody
) {
	if (!req.user) return res.status(401).send({ message: 'Unauthorized' })
	const task = await Task.findByPk(req.params.id)

	if (!task)
		return res.status(404).send({ message: "Error: Task doesn't exist" })
	if (task.assignedUserId !== req.user?.id && !req.user.admin)
		return console.log(req.user.id, task.assignedUserId)

	const allowedFields = ['title', 'description', 'assignedUserId'] as const
	allowedFields.forEach((field) => {
		if (req.body[field] === undefined) return
		task[field] = req.body[field]
	})
	if (req.body.status) task.status = req.body.status

	if (!task.changed()) return res.status(200).send({ success: false })
	await task.save()
	return res.status(200).send({ success: true })
}

export async function getTaskStats(req: RequestBodyWithAuth, res: Response) {
	if (!req.user || !req.user.admin)
		return res.status(401).send({ message: 'Unauthorized' })
	const statusCountsRaw = await Task.findAll({
		attributes: ['status', [fn('COUNT', col('id')), 'count']],
		group: ['status'],
		raw: true,
	})
	const statusCounts: { [key in TaskStatus]: number } = {
		TODO: 0,
		IN_PROGRESS: 0,
		DONE: 0,
	}
	statusCountsRaw.forEach(({ status, count }: any) => {
		statusCounts[status as TaskStatus] = parseInt(count, 10)
	})

	const userTaskCountsRaw = await User.findAll({
		attributes: ['id', 'name', [fn('COUNT', col('tasks.id')), 'count']],
		include: [
			{
				model: Task,
				as: 'tasks',
				attributes: [],
			},
		],
		group: ['User.id'],
		raw: true,
	})

	const userTaskCounts: UserTaskCount[] = userTaskCountsRaw.map(
		({ name, count }: any) => ({
			user: name,
			count: parseInt(count, 10),
		})
	)

	res.status(200).json({
		statusCounts,
		userTaskCounts,
	})
}
