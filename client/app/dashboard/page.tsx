'use client'

import { useEffect, useState } from 'react'
import { getAllTasks, useApi } from '../utils/api'
import { useUserData } from '../context/userContext'
import { TaskAttributesWithUserName } from 'Task-Management-System-common'
import TaskCard from './components/taskCard'

function Dashboard() {
	const { user } = useUserData()

	const [tasks, setTasks] = useState<TaskAttributesWithUserName[]>([])
	const getTasks = useApi<TaskAttributesWithUserName[]>(
		getAllTasks,
		setTasks,
		console.error
	)

	useEffect(() => {
		getTasks.mutate({})
		// eslint-disable-next-line
	}, [])

	return (
		<div>
			{!tasks.length && 'Nothing to show...'}
			{tasks.map((task) => (
				<TaskCard
					key={task.id}
					task={task}
					editable={user?.admin || false}
					deletable={user?.admin || false}
					revalidate={() => getTasks.mutate({})}
				/>
			))}
		</div>
	)
}

export default Dashboard
