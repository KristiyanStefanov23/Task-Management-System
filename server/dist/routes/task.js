"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const errors_1 = require("../lib/errors");
const celebrate_1 = require("celebrate");
const celebrateSchemas_1 = __importDefault(require("../validations/celebrateSchemas"));
const auth_1 = require("../middleware/auth");
const taskRouter = (0, express_1.Router)();
taskRouter.post('/', (0, celebrate_1.celebrate)({ [celebrate_1.Segments.BODY]: celebrateSchemas_1.default['post-task'] }), errors_1.falliableRoute.bind(null, taskController_1.createTask));
taskRouter.get('/', errors_1.falliableRoute.bind(null, auth_1.authenticateUser), errors_1.falliableRoute.bind(null, taskController_1.getAllTasks));
taskRouter.get('/:id', errors_1.falliableRoute.bind(null, taskController_1.getTask));
taskRouter.patch('/:id', errors_1.falliableRoute.bind(null, taskController_1.editTask));
taskRouter.delete('/:id', errors_1.falliableRoute.bind(null, taskController_1.deleteTask));
taskRouter.get('/stats', errors_1.falliableRoute.bind(null, auth_1.authenticateUser), errors_1.falliableRoute.bind(null, taskController_1.getTaskStats));
exports.default = taskRouter;
