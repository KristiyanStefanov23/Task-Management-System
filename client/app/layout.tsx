import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import StyledComponentsRegistry from './utils/styledRegistry'
import ReactQueryProvider from './utils/reactQueryProvider'
import { UserProvider } from './context/userContext'

const poppins = Poppins({
	weight: '400',
	variable: '--font-poppins',
	fallback: ['Gill Sans'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'TaskFlow – Smart Task Management & Collaboration',
	description:
		'TaskFlow is an intuitive task management web app designed to help teams and individuals stay organized, track progress, and collaborate effortlessly. Streamline your workflow with smart scheduling, reminders, and real-time updates.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html className={`${poppins.variable}`} lang='en' data-theme='light'>
			<body>
				<ReactQueryProvider>
					<StyledComponentsRegistry>
						<UserProvider>{children}</UserProvider>
					</StyledComponentsRegistry>
				</ReactQueryProvider>
			</body>
		</html>
	)
}
