import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`

export const FormWrapper = styled.div`
	background-color: white;
	padding: 30px 40px;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 400px;
	& > form > div {
		display: flex;
		justify-content: space-between;
	}
`

export const Title = styled.h2`
	text-align: center;
	margin-bottom: 20px;
	font-family: 'Roboto', sans-serif;
	color: #333;
`

export const Input = styled.input`
	width: 93%;
	padding: 12px;
	margin: 10px 0;
	border-radius: 5px;
	border: 1px solid #ccc;
	font-size: 16px;
	transition: all 0.3s ease;

	&:focus {
		border-color: #5c6bc0;
		outline: none;
	}
`

export const TextArea = styled.textarea`
	width: 93%;
	padding: 12px;
	margin: 10px 0;
	border-radius: 5px;
	border: 1px solid #ccc;
	font-size: 16px;
	min-height: 120px;
	transition: all 0.3s ease;

	&:focus {
		border-color: #5c6bc0;
		outline: none;
	}
`

export const Select = styled.select`
	padding: 12px;
	margin: 10px 0;
	border-radius: 5px;
	border: 1px solid #ccc;
	font-size: 16px;
	background-color: #fff;
	transition: all 0.3s ease;

	&:focus {
		border-color: #5c6bc0;
		outline: none;
	}
`

export const Button = styled.button`
	padding: 12px;
	margin: 20px 0 10px;
	border-radius: 5px;
	border: none;
	background-color: #5c6bc0;
	color: white;
	font-size: 16px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #3e4a8c;
	}
`

export const SuccessMsg = styled.span`
	display: block;
	text-align: center;
	color: green;
	font-size: 14px;
	margin-top: 10px;
`
