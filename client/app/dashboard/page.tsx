'use client'

import { useEffect, useState } from 'react'
import { fetchAllTasks, useApi } from '../utils/api'
import { TaskAttributes } from 'Task-Management-System-common'
import SmallTask from './components/taskCard'
import { useUserData } from '../context/userContext'

type TaskAttributesWithUserName = TaskAttributes & { assignedUserName: string }

function Dashboard() {
	const { user } = useUserData()

	const [tasks, setTasks] = useState<TaskAttributesWithUserName[]>([])
	const getTasks = useApi<TaskAttributesWithUserName[]>(
		fetchAllTasks,
		setTasks,
		console.error
	)

	useEffect(() => {
		getTasks.mutate({})
	}, [])

	return (
		<div>
			{!tasks.length && 'Nothing to show...'}
			{tasks.map((task) => (
				<SmallTask
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
