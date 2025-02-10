'use client'
import { LayoutWrapper, MainPanel, PageWrapper } from './styles'
import { useUserData } from '../context/userContext'
import Navigation from './components/navigation'

function Layout({ children }: { children: React.ReactNode }) {
	const { user } = useUserData()

	return (
		<LayoutWrapper>
			<PageWrapper>
				<MainPanel>
					<Navigation user={user} />
					<main>{children}</main>
				</MainPanel>
			</PageWrapper>
		</LayoutWrapper>
	)
}

export default Layout
