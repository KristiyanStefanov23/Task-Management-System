'use client'

function Page() {
	// const [data, setData] = useState<TaskAnalytics>()
	// const getAnalytics = useApi<TaskAnalytics, Error>(
	// 	fetchTaskAnalytics,
	// 	setData
	// )

	// useEffect(() => {
	// 	getAnalytics.mutate({})
	// }, [])
	// if (getAnalytics.isPending)
	// 	return (
	// 		<LoaderContainer>
	// 			<Loader size={50} color='#333' />
	// 		</LoaderContainer>
	// 	)
	// if (!data) return <>Loading...</>
	return (
		<h2>Not implemented</h2>
		// <AnalyticsContainer>
		// 	<PageTitle>Task Analytics</PageTitle>

		// 	<SectionHeader>Tasks by Status:</SectionHeader>
		// 	<StatusList>
		// 		{Object.entries(data.statusCounts).map(([status, count]) => (
		// 			<ListItem key={status}>
		// 				{status}: {count}
		// 			</ListItem>
		// 		))}
		// 	</StatusList>

		// 	<SectionHeader>Tasks Assigned to Users:</SectionHeader>
		// 	<UserList>
		// 		{data.userTaskCounts.map((user, index) => (
		// 			<ListItem key={index}>
		// 				{user.userName}: {user.taskCount} tasks
		// 			</ListItem>
		// 		))}
		// 	</UserList>
		// </AnalyticsContainer>
	)
}

export default Page
