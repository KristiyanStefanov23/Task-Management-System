'use client'
import { useRegister } from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
	Form,
	FormError,
	FormHeader,
	Input,
	SubmitButton,
	SwitchToFormButton,
} from '../styles'
import Link from 'next/link'
import { Loader } from 'react-feather'

export default function RegisterForm() {
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	const onRegisterSuccess = () => router.replace('/login?success')
	const onRegisterFail = (error: Error) => setError(error.message)

	const registerMutation = useRegister(onRegisterSuccess, onRegisterFail)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!(email && name && password && repeatPassword))
			return setError('All fields are required')
		registerMutation.mutate({ email, name, password, repeatPassword })
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormHeader>Register</FormHeader>
			<Input
				type='text'
				placeholder='Name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
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
			<Input
				type='password'
				placeholder='Repeat Password'
				value={repeatPassword}
				onChange={(e) => setRepeatPassword(e.target.value)}
			/>
			<SubmitButton disabled={registerMutation.isPending}>
				Register
			</SubmitButton>
			<SwitchToFormButton>
				No account? Go to <Link href='/login'>Log in</Link>
			</SwitchToFormButton>
			<FormError>{error}</FormError>
			{registerMutation.isPending && <Loader size={50} color='#fff' />}
		</Form>
	)
}
