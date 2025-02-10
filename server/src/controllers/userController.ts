import { Request, Response } from 'express'
import User from '../models/users'

export async function getAllUsers(req: Request, res: Response) {
	const users = await User.findAll()
	return res.status(200).json(users)
}
