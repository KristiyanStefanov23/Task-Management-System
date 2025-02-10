import { celebrate, Segments } from 'celebrate'
import { Router } from 'express'
import schemas from '../validations/celebrateSchemas'
import {
	getUser,
	login,
	logout,
	refresh,
	register,
} from '../controllers/authenticationController'
import { falliableRoute } from '../lib/errors'

const authRouter = Router()

authRouter.post(
	'/login',
	celebrate({ [Segments.BODY]: schemas['login'] }),
	falliableRoute.bind(null, login)
)
authRouter.post(
	'/register',
	celebrate({ [Segments.BODY]: schemas['register'] }),
	falliableRoute.bind(null, register)
)
authRouter.get('/refresh', falliableRoute.bind(null, refresh))
authRouter.post('/logout', falliableRoute.bind(null, logout))
authRouter.get('/me', falliableRoute.bind(null, getUser))

export default authRouter
