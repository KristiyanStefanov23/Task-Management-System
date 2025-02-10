import { JwtPayload } from 'jsonwebtoken'

export type AccessTokenPayload = {
	sub: string
	name: string
	admin: boolean
	iat: number
}

export type RefreshTokenPayload = Pick<AccessTokenPayload, 'sub' | 'iat'> &
	JwtPayload
