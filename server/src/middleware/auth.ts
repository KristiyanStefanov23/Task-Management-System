import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/users'
import { RequestBodyWithAuth } from '../types'

const JWT_SECRET = process.env.JWT_SECRET || 'Test JWT Access secret 12345'

export const authenticateUser = async (
	req: RequestBodyWithAuth,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.cookies['access-token']

		if (!token) return res.status(401).json({ message: 'Unauthorized' })

		const decoded = jwt.verify(token, JWT_SECRET) as { sub: string }

		const user = await User.findByPk(decoded.sub, {
			attributes: ['id', 'admin'],
		})

		if (!user) return res.status(401).json({ message: 'User not found' })

		req.user = user
		next()
	} catch (error) {
		return res.status(498).json({ message: 'Invalid or expired token' })
	}
}
