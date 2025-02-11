import { deleteTask, useApi } from '@/app/utils/api'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import {
	SuccessErrBody,
	TaskAttributesWithUserName,
	TaskStatus,
} from 'Task-Management-System-common'

const CardContainer = styled.div`
	background-color: #ffffff;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 400px;
	margin: 20px;

	& .button-list {
		display: flex;
		justify-content: space-between;
	}
`

const Title = styled.h2`
	color: #333;
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 12px;
`

const Description = styled.span`
	color: #666;
	font-size: 16px;
	display: block;
	margin-bottom: 8px;
	line-height: 1.5;
`

const Status = styled.span<{ status: TaskStatus }>`
	display: block;
	color: ${({ status }) =>
		status === 'DONE'
			? 'green'
			: status === 'IN_PROGRESS'
			? 'orange'
			: 'red'};
	font-size: 14px;
	font-weight: 500;
`

const EditButton = styled(Link)`
	color: #333;
`

const TaskCard = ({
	task,
	editable,
	deletable,
	revalidate,
}: {
	task: TaskAttributesWithUserName
	editable: boolean
	deletable: boolean
	revalidate: () => void
}) => {
	const { id, title, description, status, assignedUserName } = task
	const deleteTaskApi = useApi<SuccessErrBody, Error, string>(
		deleteTask,
		revalidate,
		console.error
	)

	return (
		<CardContainer>
			<Title>
				{title} - {assignedUserName}
			</Title>
			<Description>{description}</Description>
			<div>
				<Status status={status}>Status: {status}</Status>
				<div className='button-list'>
					<EditButton href={'/dashboard/edit-task/' + id}>
						{editable ? 'Edit' : 'View'}
					</EditButton>
					{deletable && (
						<button
							onClick={() => {
								deleteTaskApi.mutate(id)
							}}
						>
							Delete Task
						</button>
					)}
				</div>
			</div>
		</CardContainer>
	)
}

export default TaskCard
