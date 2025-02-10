"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const celebrateSchemas_1 = __importDefault(require("../validations/celebrateSchemas"));
const authenticationController_1 = require("../controllers/authenticationController");
const errors_1 = require("../lib/errors");
const authRouter = (0, express_1.Router)();
authRouter.post('/login', (0, celebrate_1.celebrate)({ [celebrate_1.Segments.BODY]: celebrateSchemas_1.default['login'] }), errors_1.falliableRoute.bind(null, authenticationController_1.login));
authRouter.post('/register', (0, celebrate_1.celebrate)({ [celebrate_1.Segments.BODY]: celebrateSchemas_1.default['register'] }), errors_1.falliableRoute.bind(null, authenticationController_1.register));
authRouter.get('/refresh', errors_1.falliableRoute.bind(null, authenticationController_1.refresh));
authRouter.post('/logout', errors_1.falliableRoute.bind(null, authenticationController_1.logout));
authRouter.get('/me', errors_1.falliableRoute.bind(null, authenticationController_1.getUser));
exports.default = authRouter;
