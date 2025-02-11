import { UserAttributes } from '../users/users'

export enum TaskStatus {
	TODO = 'TODO',
	IN_PROGRESS = 'IN_PROGRESS',
	DONE = 'DONE',
}

export type TaskCreationAttributes = {
	title: string
	description: string
	assignedUserId: string
	status?: TaskStatus
}

export type TaskAttributes = {
	id: string
	title: string
	description: string
	status: TaskStatus
	assignedUserId: string
	assignedUser?: UserAttributes
}
