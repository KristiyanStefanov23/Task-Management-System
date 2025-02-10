'use client'
import { useLogin } from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
	Form,
	FormHeader,
	FormError,
	Input,
	SubmitButton,
	SwitchToFormButton,
} from '../styles'
import { Loader } from 'react-feather'
import Link from 'next/link'

export default function LoginForm() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	const onLoginSuccess = () => {
		router.replace('/dashboard')
	}
	const onLoginFail = (error: Error) => setError(error.message)

	const loginMutation = useLogin(onLoginSuccess, onLoginFail)

	const handleSubmit = async (e: React.FormEvent) => {
		setError(null)
		e.preventDefault()
		if (!email || !password) return setError('All fields are required')
		loginMutation.mutate({ email, password })
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormHeader>Log In</FormHeader>
			<Input
				type='email'
				placeholder='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Input
				type='password'
				placeholder='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<SubmitButton type='submit' disabled={loginMutation.isPending}>
				log in
			</SubmitButton>
			<SwitchToFormButton>
				No account? Go to <Link href='/register'>Register</Link>
			</SwitchToFormButton>
			<FormError>{error}</FormError>
			{loginMutation.isPending && <Loader size={50} color='#fff' />}
		</Form>
	)
}
