"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errors_1 = require("../lib/errors");
const taskController_1 = require("../controllers/taskController");
const analyticRouter = (0, express_1.Router)();
analyticRouter.get('/', errors_1.falliableRoute.bind(null, taskController_1.getTaskStats));
exports.default = analyticRouter;
