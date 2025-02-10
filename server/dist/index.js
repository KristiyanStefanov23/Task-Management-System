"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const cluster_1 = __importDefault(require("cluster"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./database/db");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const port = process.env.PORT || 3000;
const setupWorkerProcesses = () => {
    const coresCount = os_1.default.cpus().length;
    const workersCount = Number(process.env.MAX_WORKERS) || coresCount;
    console.log(`Master cluster setting up ${workersCount} workers`);
    for (let i = 0; i < workersCount; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('online', (worker) => {
        console.log(`Worker ${worker.process.pid} is listening`);
    });
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
        console.log('Starting a new worker');
        cluster_1.default.fork();
    });
};
const createCluster = (fn) => {
    if (cluster_1.default.isPrimary) {
        setupWorkerProcesses();
    }
    else {
        fn();
    }
};
const init = () => {
    (0, db_1.initDb)().then(() => app_1.default.listen(port, () => {
        console.log(`App running on http://localhost:${port}`);
    }));
};
// createCluster(init)
init();
