"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.register = register;
exports.refresh = refresh;
exports.logout = logout;
exports.getUser = getUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = __importStar(require("../lib/jwt"));
const users_1 = __importDefault(require("../models/users"));
const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
const issueAndSetJWT = (res, user) => {
    const { accessToken, refreshToken } = (0, jwt_1.default)(user);
    // low values for testing the token functionality
    const expireTimeAccess = new Date(Date.now() + 60000); // + 1 min
    const expireTimeRefresh = new Date(Date.now() + 600000); // + 5min
    res.cookie('access-token', accessToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        expires: expireTimeAccess,
    });
    res.cookie('refresh-token', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        expires: expireTimeRefresh,
    });
};
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const user = yield users_1.default.findOne({ where: { email } });
        if (!user)
            return res.status(401).send({ message: 'Invalid Credentials' });
        if (!bcrypt_1.default.compareSync(password, user.password))
            return res.status(401).send({ message: 'Invalid Credentials' });
        issueAndSetJWT(res, user);
        return res.status(200).send({ success: true });
    });
}
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, password } = req.body;
        const email = req.body.email.toLowerCase();
        if (yield users_1.default.findOne({ where: { email } }))
            return res.status(409).send({ message: 'E-mail already registered' });
        const hash = bcrypt_1.default.hashSync(password, saltRounds);
        yield users_1.default.create({ email, name, password: hash });
        return res.status(201).send({ success: true });
    });
}
function refresh(req, res) {
    const refreshTokenFromCookie = req.cookies['refresh-token'];
    (0, jwt_1.verifyJWT)(refreshTokenFromCookie, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
        if (err || !decoded)
            return res.status(498).send({ message: 'Invalid/Expired token' });
        const id = decoded === null || decoded === void 0 ? void 0 : decoded.sub;
        const user = yield users_1.default.findByPk(id);
        if (!user)
            return res.status(401).send({ message: 'Unauthorized' });
        issueAndSetJWT(res, user);
        return res.status(200).send({ success: true });
    }));
}
function logout(req, res) {
    res.clearCookie('access-token', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    res.clearCookie('refresh-token', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    return res.status(200).json({ message: 'Logged out successfully' });
}
function getUser(req, res) {
    try {
        const token = req.cookies['access-token'];
        if (!token)
            return res
                .status(401)
                .json({ success: false, message: 'Unauthorized' });
        (0, jwt_1.verifyJWT)(token, (err, decoded) => {
            if (err)
                return res.status(401);
            res.json({ success: true, user: decoded });
        });
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
}
