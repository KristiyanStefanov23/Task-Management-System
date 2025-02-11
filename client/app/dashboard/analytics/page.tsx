'use client'

import { useUserData } from '@/app/context/userContext'
import { getTaskAnalytics, useApi } from '@/app/utils/api'
import { redirect } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { PageWrapper } from '../styles'
import { TaskAnalytics } from 'Task-Management-System-common'

function Page() {
	const { user } = useUserData()
	const [data, setData] = useState<TaskAnalytics>()
	const getAnalyticsData = useApi<TaskAnalytics>(
		getTaskAnalytics,
		setData,
		console.error
	)

	useEffect(() => {
		getAnalyticsData.mutate({})
		// eslint-disable-next-line
	}, [])

	if (user && !user.admin) redirect('/dashboard')
	if (getAnalyticsData.isPending) return <span>Loading...</span>
	return (
		<PageWrapper>
			<h2>Analytics</h2>
			{!data ? (
				'No Data'
			) : (
				<>
					<div>
						<br />
						{Object.entries(data.statusCounts).map(
							([key, value]: [string, number]) => (
								<Fragment key={key}>
									<div>
										{key}: {value}
									</div>
									<br />
								</Fragment>
							)
						)}
					</div>
					<div>
						<br />
						<br />
						{data.userTaskCounts.map(({ count, user }) => (
							<>
								<div>
									User {user} currently has {count} Tasks
								</div>
								<br />
							</>
						))}
					</div>
				</>
			)}
		</PageWrapper>
	)
}

export default Page
