import { Request, Response } from 'express'
import User from '../../models/users'

type SuccessBody = { success: boolean }
type ErrorBody = { message: string }
export type ResponseSuccessErrBody = Response<SuccessBody | ErrorBody>
export type RequestBody<T, P = object> = Request<P, object, T>
export type RequestBodyWithAuth = Request & {
	user: User
}
