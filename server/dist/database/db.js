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
exports.initDb = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_1 = __importDefault(require("../models/users"));
const tasks_1 = __importDefault(require("../models/tasks"));
const DATABASE_URL = `${process.env.DB_DIALECT}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const sequelize = new sequelize_typescript_1.Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    define: { freezeTableName: true },
    models: [users_1.default, tasks_1.default],
});
const initDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('Database connected!');
        yield sequelize.query(`CREATE SCHEMA IF NOT EXISTS "TaskManagementSystem"`);
        yield sequelize.sync({ alter: true, schema: 'TaskManagementSystem' });
        console.log('Database synchronized!');
    }
    catch (error) {
        console.error('Error connecting to database:', error);
    }
});
exports.initDb = initDb;
exports.default = sequelize;
