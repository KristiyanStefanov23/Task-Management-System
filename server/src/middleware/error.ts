import { logError } from '../lib/errors'

export function catchAsyncErrors(err: any, req: any, res: any, next: any) {
	if (!err) {
		return next()
	}

	logError(req, err)

	if (res.headersSent) {
		return
	}

	return res.status(500).json({ message: 'Server error' })
}
