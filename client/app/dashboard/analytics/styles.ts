// styles.ts (or wherever you store your styles)

import styled from 'styled-components'

// Container for the page
export const AnalyticsContainer = styled.div`
	padding: 2rem;
	max-width: 1200px;
	margin: 0 auto;
`

// Title for the page
export const PageTitle = styled.h2`
	font-size: 2.5rem;
	color: #333;
	text-align: center;
	margin-bottom: 2rem;
`

// Section headers (like "Tasks by Status")
export const SectionHeader = styled.h3`
	font-size: 1.75rem;
	color: #444;
	margin-bottom: 1rem;
	text-align: left;
`

// Wrapper for the status list
export const StatusList = styled.ul`
	list-style-type: none;
	padding: 0;
`

// Wrapper for the user task count list
export const UserList = styled.ul`
	list-style-type: none;
	padding: 0;
`

// Individual list item for both status and user task counts
export const ListItem = styled.li`
	font-size: 1.2rem;
	color: #555;
	margin-bottom: 0.75rem;

	&:hover {
		background-color: #f1f1f1;
		padding-left: 1rem;
		transition: all 0.3s ease;
	}
`

// Loading spinner container (optional)
export const LoaderContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 2rem;
`
