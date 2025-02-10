import { TaskAttributes } from '../tasks/tasks'

export type UserCreationAttributes = {
	name: string
	email: string
	password: string
}

export type UserAttributes = {
	id: string
	admin: boolean
	name: string
	email: string
	password: string
	tasks?: TaskAttributes[]
}
