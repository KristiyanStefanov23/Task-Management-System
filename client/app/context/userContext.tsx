'use client'

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'
import { UserAttributes } from 'Task-Management-System-common'
import api from '../utils/api'

interface UserContextType {
	user: UserAttributes | null
	setUser: (user: UserAttributes | null) => void
	logout: () => void
	fetchUser: () => Promise<UserAttributes>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserAttributes | null>(null)

	const fetchUser = useCallback(async () => {
		if (user) return user
		const res = await api('/auth/me', {
			method: 'GET',
			withCredentials: true,
		})

		if (!res.data?.success) throw res
		setUser(res.data.user)
		return res.data.user
	}, [user])

	useEffect(() => {
		if (!user) fetchUser()
	}, [user, fetchUser])

	const logout = () => {
		setUser(null)
	}

	return (
		<UserContext.Provider value={{ user, setUser, logout, fetchUser }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUserData = () => {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error('useUserData must be used within a UserProvider')
	}
	return context
}
