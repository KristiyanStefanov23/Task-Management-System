import { Router } from 'express'
import authRouter from './routes/auth'
import taskRouter from './routes/task'
import { authenticateUser } from './middleware/auth'
import { falliableRoute } from './lib/errors'
import userRouter from './routes/user'
import analyticRouter from './routes/analytics'

const appRouter = Router()

appRouter.use('/auth', authRouter)
appRouter.use('/users', falliableRoute.bind(null, authenticateUser), userRouter)
appRouter.use('/tasks', falliableRoute.bind(null, authenticateUser), taskRouter)
appRouter.use(
	'/analytic',
	falliableRoute.bind(null, authenticateUser),
	analyticRouter
)

export default appRouter
