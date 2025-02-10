'use client'

import { LayoutWrapper } from './styles'

function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <LayoutWrapper>{children}</LayoutWrapper>
}

export default Layout
