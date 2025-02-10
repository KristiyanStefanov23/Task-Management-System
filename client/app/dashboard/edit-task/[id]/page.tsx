'use client'
import { useEffect, useState } from 'react'
import {
	Button,
	Container,
	FormWrapper,
	Input,
	Select,
	SuccessMsg,
	TextArea,
	Title,
} from '../../create-task/styles'
import { useUserData } from '@/app/context/userContext'
import {
	TaskAttributes,
	TaskCreationAttributes,
	TaskStatus,
	UserAttributes,
} from 'Task-Management-System-common'
import { editTask, fetchAllUsers, getTask, useApi } from '@/app/utils/api'
import { useParams } from 'next/navigation'
import Link from 'next/link'

function Page() {
	const { id } = useParams()
	const { user, fetchUser } = useUserData()
	const [users, setUsers] = useState<UserAttributes[]>([])
	const [task, setTask] = useState<TaskCreationAttributes | null>(null)
	const [title, setTitle] = useState<string>('')
	const [status, setStatus] = useState<TaskStatus | null>(null)
	const [description, setDescription] = useState<string>('')
	const [assigned, setAssigned] = useState<string>('')
	const [successMsg, setSuccessMsg] = useState<string | null>(null)
	const onCreate = () => {
		setSuccessMsg('Successfully created')
	}
	const getUsers = useApi<UserAttributes[]>(fetchAllUsers, setUsers)
	const updateTask = useApi<
		unknown,
		unknown,
		TaskCreationAttributes & Pick<TaskAttributes, 'id'>
	>(editTask, onCreate)
	const getTaskToEdit = useApi(getTask, (data: TaskAttributes) => {
		setTask(data as TaskCreationAttributes)
		setTitle(data.title)
		setStatus(data.status)
		setDescription(data.description)
		setAssigned(data.assignedUserId)
	})

	const submitForm = (e: React.FormEvent) => {
		e.preventDefault()
		updateTask.mutate({
			id: id as string,
			title,
			description,
			assignedUserId: assigned,
			...{ ...(status ? { status } : {}) },
		})
	}

	useEffect(() => {
		getTaskToEdit.mutate(id as string)
		if (!user) fetchUser()
		if (user?.admin) {
			getUsers.mutate({})
		}
	}, [user])
	if (!task) return <span>Loading</span>
	return (
		<Container>
			<FormWrapper>
				<Title>Edit Task</Title>
				<form onSubmit={submitForm}>
					<Input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Task Title'
						disabled={!user?.admin}
					/>
					<TextArea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder='Task Description'
						disabled={!user?.admin}
					/>
					<div>
						{!!users.length && (
							<Select
								onChange={(e) => setAssigned(e.target.value)}
								value={assigned}
							>
								<option value='' disabled>
									Select User
								</option>
								{users.map((user) => (
									<option key={user.id} value={user.id}>
										{user.name}
									</option>
								))}
							</Select>
						)}
						<select
							onChange={(e) =>
								setStatus(e.target.value as TaskStatus)
							}
						>
							<option value='TODO'>To Do</option>
							<option value='IN_PROGRESS'>In progress</option>
							<option value='DONE'>done</option>
						</select>
						<Button type='submit'>Edit Task</Button>
					</div>
					{successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
				</form>
				<Link href='/dashboard'>Back</Link>
			</FormWrapper>
		</Container>
	)
}

export default Page
