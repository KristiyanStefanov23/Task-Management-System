"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const errors_1 = require("../lib/errors");
const userRouter = (0, express_1.Router)();
userRouter.get('/', errors_1.falliableRoute.bind(null, userController_1.getAllUsers));
exports.default = userRouter;
