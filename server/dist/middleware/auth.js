"use strict";
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
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../models/users"));
const JWT_SECRET = process.env.JWT_SECRET || 'Test JWT Access secret 12345';
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies['access-token'];
        if (!token)
            return res.status(401).json({ message: 'Unauthorized' });
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = yield users_1.default.findByPk(decoded.sub, {
            attributes: ['id', 'admin'],
        });
        if (!user)
            return res.status(401).json({ message: 'User not found' });
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(498).json({ message: 'Invalid or expired token' });
    }
});
exports.authenticateUser = authenticateUser;
