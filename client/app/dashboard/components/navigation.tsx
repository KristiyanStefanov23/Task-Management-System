'use client'
import { useLogout } from '@/app/hooks/useAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import { UserAttributes } from 'Task-Management-System-common'

const Nav = styled.nav`
	height: 3.75rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	gap: 1rem;
	background-color: #333;
	color: white;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

	& > div {
		display: flex;
	}

	@media (max-width: 768px) {
		flex-direction: column;
		height: auto;
		padding: 10px;
	}
`

const Greeting = styled.span`
	font-weight: 500;
	margin-right: 20px;
`

const LinksContainer = styled.div`
	display: flex;
	gap: 1.5rem;
	align-items: center;
`

const NavLink = styled(Link)`
	color: white;
	text-decoration: none;
	font-size: 16px;
	font-weight: 500;
	transition: color 0.3s ease;

	&:hover {
		color: #5c6bc0;
	}
`

const LogoutButton = styled.button`
	padding: 8px 16px;
	font-size: 14px;
	font-weight: 600;
	color: white;
	background-color: #f44336;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #d32f2f;
	}

	@media (max-width: 768px) {
		margin-top: 10px;
	}
`

function Navigation({ user }: { user: UserAttributes | null }) {
	const router = useRouter()
	const onLogoutSuccess = () => router.push('/login')
	const { mutate } = useLogout(onLogoutSuccess)

	if (!user) return null
	return (
		<Nav>
			<div>
				<Greeting>
					Hi, {user.admin && 'Administrator'} {user.name}
				</Greeting>
				{user.admin && (
					<LinksContainer>
						<NavLink href='/dashboard/analytics'>Analytics</NavLink>
						<NavLink href='/dashboard/create-task'>
							Create Task
						</NavLink>
					</LinksContainer>
				)}
			</div>
			<LogoutButton onClick={() => mutate()}>Log out</LogoutButton>
		</Nav>
	)
}

export default Navigation
