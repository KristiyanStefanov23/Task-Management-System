import { Request, Response } from 'express'
import User from '../../models/users'
import { SuccessErrBody } from 'Task-Management-System-common'

export type ResponseSuccessErrBody = Response<SuccessErrBody>
export type RequestBody<T, P = object> = Request<P, object, T>
export type RequestBodyWithAuth = Request & {
	user: User
}
