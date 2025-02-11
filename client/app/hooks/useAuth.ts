import { useMutation } from '@tanstack/react-query'
import api from '../utils/api'
import { useUserData } from '../context/userContext'
import {
	LoginCredentials,
	RegisterCredentials,
} from 'Task-Management-System-common'

const login = async (credentials: LoginCredentials) => {
	const res = await api('/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		data: credentials,
		withCredentials: true,
	})

	if (!res.data?.success) throw res
	return res.data
}

const register = async (credentials: RegisterCredentials) => {
	const res = await api('/auth/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		data: credentials,
		withCredentials: true,
	})

	if (!res.data?.success) throw res
	return res.data
}

const logout = async () => {
	const res = await api('/auth/logout', {
		method: 'POST',
		withCredentials: true,
	})

	return res.data
}

export const useLogin = (
	onSuccess?: () => void,
	onError?: (err: Error) => void
) => {
	const { fetchUser } = useUserData()

	return useMutation({
		mutationFn: login,
		onSuccess: () => {
			try {
				fetchUser()

				if (onSuccess) onSuccess()
			} catch (error) {
				console.error('Failed to fetch user after login', error)
			}
		},
		onError,
	})
}

export const useRegister = (
	onSuccess?: () => void,
	onError?: (err: Error) => void
) => {
	return useMutation({
		mutationFn: register,
		onSuccess: async () => {
			try {
				if (onSuccess) onSuccess()
			} catch (error) {
				console.error('Failed to fetch user after registration', error)
			}
		},
		onError,
	})
}

export const useLogout = (
	onSuccess?: () => void,
	onError?: (err: Error) => void
) => {
	const { logout: clearAuthData } = useUserData()

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			clearAuthData()
			if (onSuccess) onSuccess()
		},
		onError,
	})
}
