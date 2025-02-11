import { Router } from 'express'
import { falliableRoute } from '../lib/errors'
import { getTaskStats } from '../controllers/taskController'

const analyticRouter = Router()

analyticRouter.get('/', falliableRoute.bind(null, getTaskStats))

export default analyticRouter
