import styled from 'styled-components'

export const LayoutWrapper = styled.main`
	background: linear-gradient(rgba(0, 0, 0, 1), #9c9c9c10),
		url('/winter.jpg') no-repeat 50% 50%;
	background-size: cover;
	height: 100vh;
`

export const PageWrapper = styled.div`
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export const MainPanel = styled.div`
	width: 90%;
	height: 100%;
	background: linear-gradient(rgb(204, 204, 204), rgba(139, 139, 139, 0.06));
`
