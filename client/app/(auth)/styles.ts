import styled, { css, keyframes } from 'styled-components'

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const formAppearAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

export const LayoutWrapper = styled.main`
	background: linear-gradient(rgba(0, 0, 0, 0.7), #9c9c9c39),
		url('/mountains.jpg') no-repeat 50% 50%;
	background-size: cover;
	height: 100vh;

	display: flex;
	justify-content: center;
	align-items: center;
`

export const Form = styled.form`
	display: flex;
	gap: 1rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	animation: ${formAppearAnimation} 0.6s ease-out;

	& > svg {
		animation: ${rotateAnimation} 2s linear infinite;
		position: absolute;
		top: 10%;
	}
`

export const FormHeader = styled.h2`
	color: #f3f3f3;
`

const formCommon = css`
	transition: 0.3s ease-out all;
	&::placeholder {
		transition: 0.3s ease-out all;
	}

	border-radius: 1.25rem;
	padding: 0.6rem 1rem;

	width: 16.5rem;
	font-size: 0.8rem;
`

export const Input = styled.input`
	${formCommon}

	&:hover,
  &:focus {
		&::placeholder {
			color: rgba(231, 231, 231, 0.67);
		}
		background: rgba(199, 199, 199, 0.25);
	}

	box-sizing: border-box;

	background: rgba(214, 214, 214, 0.2);
	color: rgba(243, 243, 243, 0.67);
`

export const SubmitButton = styled.button`
	${formCommon}

	background: rgba(255, 216, 157, 0.9);
	color: rgba(78, 78, 78, 0.8);
	font-weight: bold;
	letter-spacing: 0.01rem;
	text-transform: uppercase;
	text-align: center;
	cursor: pointer;

	&:disabled {
		background: rgb(117, 117, 117);
		color: #ffffff;
	}

	&:hover:enabled {
		background: rgba(255, 216, 157, 1);
	}
`

export const FormError = styled.span`
	height: 1rem;
	color: red;
`

export const SwitchToFormButton = styled.span`
	font-size: 0.8rem;
	color: #f3f3f3;
`
