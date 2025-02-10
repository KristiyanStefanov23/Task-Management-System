'use client'
import { useUserData } from '@/app/context/userContext'
import { createTask, fetchAllUsers, useApi } from '@/app/utils/api'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
	TaskCreationAttributes,
	UserAttributes,
} from 'Task-Management-System-common'
import {
	Container,
	Button,
	FormWrapper,
	Input,
	Select,
	SuccessMsg,
	TextArea,
	Title,
} from './styles'
import Link from 'next/link'

function CreateTask() {
	const [users, setUsers] = useState<UserAttributes[]>([])
	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [assigned, setAssigned] = useState<string>('')
	const [successMsg, setSuccessMsg] = useState<string | null>(null)
	const onCreate = () => {
		setTitle('')
		setDescription('')
		setSuccessMsg('Successfully created')
	}
	const { user } = useUserData()
	const getUsers = useApi<UserAttributes[]>(fetchAllUsers, setUsers)
	const createTaskApi = useApi<unknown, unknown, TaskCreationAttributes>(
		createTask,
		onCreate
	)

	const submitForm = (e: React.FormEvent) => {
		e.preventDefault()
		createTaskApi.mutate({ title, description, assignedUserId: assigned })
	}

	useEffect(() => {
		getUsers.mutate({})
	}, [])

	if (user && !user?.admin) return redirect('/dashboard')
	return (
		<Container>
			<FormWrapper>
				<Title>Create Task</Title>
				<form onSubmit={submitForm}>
					<Input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Task Title'
					/>
					<TextArea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder='Task Description'
					/>
					<div>
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
						<Button type='submit'>Create Task</Button>
					</div>
					{successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
				</form>
				<Link href='/dashboard'>Back</Link>
			</FormWrapper>
		</Container>
	)
}

export default CreateTask
