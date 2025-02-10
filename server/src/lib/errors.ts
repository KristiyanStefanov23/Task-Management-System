export async function falliableRoute(fn: any, req: any, res: any, next: any) {
	try {
		await fn(req, res, next)
	} catch (err) {
		logError(req, err)
		return res.status(500).json({ message: 'Server error' })
	}
}

export function logError(req: any, error: any) {
	console.error(
		`[${new Date().toISOString()}] internal server error`,
		req.originalUrl,
		error
	)
}
