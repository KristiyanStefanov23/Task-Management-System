import { Request, Response } from 'express'
import { RequestBody, ResponseSuccessErrBody } from '../types'
import { UserAttributes } from '../types/users/users'
import bcrypt from 'bcrypt'
import issueJWT, { verifyJWT } from '../lib/jwt'
import User from '../models/users'

const saltRounds = Number(process.env.SALT_ROUNDS) || 10

const issueAndSetJWT = (res: Response, user: User) => {
	const { accessToken, refreshToken } = issueJWT(user)

	// low values for testing the token functionality
	const expireTimeAccess = new Date(Date.now() + 60000) // + 1 min
	const expireTimeRefresh = new Date(Date.now() + 600000) // + 5min

	res.cookie('access-token', accessToken, {
		httpOnly: true,
		sameSite: 'none',
		secure: true,
		expires: expireTimeAccess,
	})
	res.cookie('refresh-token', refreshToken, {
		httpOnly: true,
		sameSite: 'none',
		secure: true,
		expires: expireTimeRefresh,
	})
}

export async function login(
	req: RequestBody<Pick<UserAttributes, 'email' | 'password'>>,
	res: ResponseSuccessErrBody
) {
	const { email, password } = req.body

	const user = await User.findOne({ where: { email } })

	if (!user) return res.status(401).send({ message: 'Invalid Credentials' })
	if (!bcrypt.compareSync(password, user.password))
		return res.status(401).send({ message: 'Invalid Credentials' })
	issueAndSetJWT(res, user)
	return res.status(200).send({ success: true })
}

export async function register(
	req: RequestBody<
		Pick<UserAttributes, 'email' | 'password' | 'name'>,
		{ repeatPassword: string }
	>,
	res: ResponseSuccessErrBody
) {
	const { name, password } = req.body
	const email = req.body.email.toLowerCase()
	if (await User.findOne({ where: { email } }))
		return res.status(409).send({ message: 'E-mail already registered' })
	const hash = bcrypt.hashSync(password, saltRounds)
	await User.create({ email, name, password: hash })
	return res.status(201).send({ success: true })
}

export function refresh(req: Request, res: ResponseSuccessErrBody) {
	const refreshTokenFromCookie = req.cookies['refresh-token']

	verifyJWT(refreshTokenFromCookie, async (err, decoded) => {
		if (err || !decoded)
			return res.status(498).send({ message: 'Invalid/Expired token' })
		const id = decoded?.sub
		const user = await User.findByPk(id)
		if (!user) return res.status(401).send({ message: 'Unauthorized' })
		issueAndSetJWT(res, user)

		return res.status(200).send({ success: true })
	})
}

export function logout(req: Request, res: ResponseSuccessErrBody) {
	res.clearCookie('access-token', {
		httpOnly: true,
		sameSite: 'none',
		secure: true,
	})
	res.clearCookie('refresh-token', {
		httpOnly: true,
		sameSite: 'none',
		secure: true,
	})
	return res.status(200).json({ message: 'Logged out successfully' })
}

export function getUser(req: Request, res: Response) {
	try {
		const token = req.cookies['access-token']
		if (!token)
			return res
				.status(401)
				.json({ success: false, message: 'Unauthorized' })

		verifyJWT(token, (err, decoded) => {
			if (err) return res.status(401)
			res.json({ success: true, user: decoded })
		})
	} catch (error) {
		console.log('\n\n\n\nclean\n\n\n\n')

		res.clearCookie('access-token', {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		})
		res.clearCookie('refresh-token', {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		})
		res.status(401).json({ success: false, message: 'Invalid token' })
	}
}
