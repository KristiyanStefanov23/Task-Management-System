"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = verifyJWT;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accessSecret = process.env.JWT_SECRET || 'Test JWT Access secret 12345';
const refreshSecret = process.env.JWT_SECRET || 'secret JWT Refresh Test 54321';
function issueJWT(user) {
    const accessPayload = {
        sub: user.id,
        name: user.name,
        admin: user.admin,
        iat: Math.floor(Date.now() / 1000),
    };
    const refreshPayload = {
        sub: user.id,
        iat: Math.floor(Date.now() / 1000),
    };
    const accessToken = jsonwebtoken_1.default.sign(accessPayload, accessSecret, {
        algorithm: 'HS256',
        expiresIn: '1m',
    });
    const refreshToken = jsonwebtoken_1.default.sign(refreshPayload, refreshSecret, {
        algorithm: 'HS256',
        expiresIn: '5min',
    });
    return { accessToken, refreshToken };
}
function verifyJWT(token, cb) {
    jsonwebtoken_1.default.verify(token, refreshSecret, (jwtErr, jwtDecoded) => cb(jwtErr, jwtDecoded));
}
exports.default = issueJWT;
