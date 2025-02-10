import { Response } from 'express'
import {
	RequestBody,
	RequestBodyWithAuth,
	ResponseSuccessErrBody,
	TaskAttributes,
	TaskCreationAttributes,
} from '../types'
import { Sequelize } from 'sequelize'
import Task from '../models/tasks'
import User from '../models/users'

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
	if (!task) return res.status(404).send({ message: "Couldn'nt find Task" })

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
	if (!req.user) return res.status(401).send({ message: 'Unauthorized' })
	if (!req.user.admin)
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
	throw new Error('Not implemented')
}
