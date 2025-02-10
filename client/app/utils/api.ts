import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { redirect } from 'next/navigation'
import {
	ResponseSuccessErrBody,
	TaskAttributes,
	TaskCreationAttributes,
	TaskStatus,
} from 'Task-Management-System-common'

type UserTaskCount = {
	userName: string
	taskCount: number
}

export type TaskAnalytics = {
	statusCounts: TaskStatus
	userTaskCounts: UserTaskCount[]
}

const api = axios.create({
	baseURL: typeof window === 'undefined' ? process.env.API_BASE_URL : '/api',
	withCredentials: true,
})

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config

		if (
			['/login', '/register'].some((url) =>
				originalRequest.url.includes(url)
			)
		)
			return { status: error.status, ...error.response.data }

		try {
			if (
				error.response &&
				error.response.status === 401 &&
				!originalRequest._retry
			) {
				originalRequest._retry = true
				try {
					await api.get('/auth/refresh')
				} catch (error) {
					console.error(error)
					redirect('/login')
				}

				return api(originalRequest)
			}
		} catch (err) {
			console.error('Error refreshing token:', err)
		}

		return { status: error.status, ...error.response.data }
	}
)

export const fetchAllTasks = async () => {
	const res = await api.get('/tasks')
	if (res.status !== 200) throw res
	return res.data
}
export const getTask = async (id: string) => {
	if (!id) throw new Error('No id provided')
	const res = await api.get('/tasks/' + id)
	if (res.status !== 200) throw res.data.message
	return res.data
}
export const editTask = async (
	data: TaskCreationAttributes & Pick<TaskAttributes, 'id'>
) => {
	if (!data) throw new Error('No data provided')
	const res = await api.patch('/tasks/' + data.id, data)
	if (res.status !== 200) throw res.data.message
	return res.data
}
export const deleteTask = async (
	id: string
): Promise<ResponseSuccessErrBody> => {
	if (!id) throw new Error('No data provided')
	const res = await api.delete('/tasks/' + id)
	if (res.status !== 200) throw res.data.message
	return res.data
}
export const fetchAllUsers = async () => {
	const res = await api.get('/users')
	if (res.status !== 200) throw res.data.message
	return res.data
}
export const createTask = async (data: TaskCreationAttributes) => {
	if (!data) throw new Error('No data provided')
	const res = await api.post('/tasks', data)
	if (res.status !== 201) throw res.data.message
	return res.data
}
export const fetchTaskAnalytics = async (): Promise<TaskAnalytics> => {
	const res = await api.get('/tasks/stats')
	if (res.status !== 200) throw res.data.message
	return res.data
}

export const useApi = <TData = unknown, TError = unknown, TVariables = unknown>(
	fn: (data: TVariables) => Promise<TData>,
	onSuccess?: (data: TData) => void,
	onError?: (err: TError) => void
) => {
	return useMutation<TData, TError, TVariables>({
		mutationFn: fn,
		onSuccess: onSuccess || undefined,
		onError: onError || undefined,
	})
}

export default api
