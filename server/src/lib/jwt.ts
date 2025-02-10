import User from '../models/users'
import jwt, { VerifyCallback } from 'jsonwebtoken'
import { AccessTokenPayload, RefreshTokenPayload } from '../types/auth/auth'

const accessSecret = process.env.JWT_SECRET || 'Test JWT Access secret 12345'
const refreshSecret = process.env.JWT_SECRET || 'secret JWT Refresh Test 54321'

function issueJWT(user: User) {
	const accessPayload: AccessTokenPayload = {
		sub: user.id,
		name: user.name,
		admin: user.admin,
		iat: Math.floor(Date.now() / 1000),
	}

	const refreshPayload: RefreshTokenPayload = {
		sub: user.id,
		iat: Math.floor(Date.now() / 1000),
	}

	const accessToken = jwt.sign(accessPayload, accessSecret, {
		algorithm: 'HS256',
		expiresIn: '1m',
	})

	const refreshToken = jwt.sign(refreshPayload, refreshSecret, {
		algorithm: 'HS256',
		expiresIn: '5min',
	})

	return { accessToken, refreshToken }
}

export function verifyJWT(
	token: string,
	cb: VerifyCallback<RefreshTokenPayload>
) {
	jwt.verify(token, refreshSecret, (jwtErr, jwtDecoded) =>
		cb(jwtErr, jwtDecoded as RefreshTokenPayload)
	)
}

export default issueJWT
