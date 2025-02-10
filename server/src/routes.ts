import { Router } from 'express'
import authRouter from './routes/auth'
import taskRouter from './routes/task'
import { authenticateUser } from './middleware/auth'
import { falliableRoute } from './lib/errors'
import userRouter from './routes/user'

const appRouter = Router()

appRouter.use('/auth', authRouter)
appRouter.use('/users', falliableRoute.bind(null, authenticateUser), userRouter)
appRouter.use('/tasks', falliableRoute.bind(null, authenticateUser), taskRouter)

export default appRouter
