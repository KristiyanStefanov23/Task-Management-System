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
exports.getAllTasks = getAllTasks;
exports.getTask = getTask;
exports.createTask = createTask;
exports.deleteTask = deleteTask;
exports.editTask = editTask;
exports.getTaskStats = getTaskStats;
const tasks_1 = __importDefault(require("../models/tasks"));
const users_1 = __importDefault(require("../models/users"));
function getAllTasks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.user)
            return res.status(401).send({ message: 'Unauthorized' });
        const options = Object.assign(Object.assign({}, (req.user.admin ? {} : { where: { assignedUserId: req.user.id } })), { include: { model: users_1.default, as: 'assignedUser', attributes: ['name'] } });
        const tasks = yield tasks_1.default.findAll(options);
        const result = tasks.map(({ id, title, description, status, assignedUserId, assignedUser }) => {
            return {
                id,
                title,
                description,
                status,
                assignedUserId,
                assignedUserName: assignedUser ? assignedUser.name : null,
            };
        });
        res.status(200).json(result);
    });
}
function getTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.user)
            return res.status(401).send({ message: 'Unauthorized' });
        const { id } = req.params;
        const task = yield tasks_1.default.findByPk(id, {
            include: { model: users_1.default, as: 'assignedUser', attributes: ['name'] },
        });
        if (!task)
            return res.status(404).send({ message: "Couldn'nt find Task" });
        res.status(200).json(task);
    });
}
function createTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        tasks_1.default.create({
            title: req.body.title,
            description: req.body.description,
            assignedUserId: req.body.assignedUserId,
        });
        return res.status(201).send({ success: true });
    });
}
function deleteTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.user)
            return res.status(401).send({ message: 'Unauthorized' });
        if (!req.user.admin)
            return res.status(401).send({ message: 'Unauthorized' });
        const task = yield tasks_1.default.findByPk(req.params.id);
        if (!task)
            return res.status(404).send({ message: "Couldn't find task" });
        try {
            yield task.destroy();
            res.status(200).send({ success: true });
        }
        catch (error) {
            res.status(500).send({ message: 'Error deleting task' });
        }
    });
}
function editTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!req.user)
            return res.status(401).send({ message: 'Unauthorized' });
        const task = yield tasks_1.default.findByPk(req.params.id);
        if (!task)
            return res.status(404).send({ message: "Error: Task doesn't exist" });
        if (task.assignedUserId !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) && !req.user.admin)
            return console.log(req.user.id, task.assignedUserId);
        const allowedFields = ['title', 'description', 'assignedUserId'];
        allowedFields.forEach((field) => {
            if (req.body[field] === undefined)
                return;
            task[field] = req.body[field];
        });
        if (req.body.status)
            task.status = req.body.status;
        if (!task.changed())
            return res.status(200).send({ success: false });
        yield task.save();
        return res.status(200).send({ success: true });
    });
}
function getTaskStats(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        throw new Error('Not implemented');
    });
}
