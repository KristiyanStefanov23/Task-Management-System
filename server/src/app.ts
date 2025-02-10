import express from 'express'
import appRouter from './routes'
import { catchAsyncErrors } from './middleware/error'
import { errors } from 'celebrate'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api', appRouter)

app.use(errors())
app.use(catchAsyncErrors)

export default app
