import { Router } from 'express'
import { getAllUsers } from '../controllers/userController'
import { falliableRoute } from '../lib/errors'

const userRouter = Router()

userRouter.get('/', falliableRoute.bind(null, getAllUsers))

export default userRouter
