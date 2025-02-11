"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./routes/auth"));
const task_1 = __importDefault(require("./routes/task"));
const auth_2 = require("./middleware/auth");
const errors_1 = require("./lib/errors");
const user_1 = __importDefault(require("./routes/user"));
const analytics_1 = __importDefault(require("./routes/analytics"));
const appRouter = (0, express_1.Router)();
appRouter.use('/auth', auth_1.default);
appRouter.use('/users', errors_1.falliableRoute.bind(null, auth_2.authenticateUser), user_1.default);
appRouter.use('/tasks', errors_1.falliableRoute.bind(null, auth_2.authenticateUser), task_1.default);
appRouter.use('/analytic', errors_1.falliableRoute.bind(null, auth_2.authenticateUser), analytics_1.default);
exports.default = appRouter;
