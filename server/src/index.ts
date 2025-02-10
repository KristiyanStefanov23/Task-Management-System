import os from 'os'
import cluster from 'cluster'
import app from './app'
import { initDb } from './database/db'
import { config } from 'dotenv'
config()

const port = process.env.PORT || 3000

const setupWorkerProcesses = () => {
	const coresCount = os.cpus().length
	const workersCount = Number(process.env.MAX_WORKERS) || coresCount
	console.log(`Master cluster setting up ${workersCount} workers`)

	for (let i = 0; i < workersCount; i++) {
		cluster.fork()
	}

	cluster.on('online', (worker) => {
		console.log(`Worker ${worker.process.pid} is listening`)
	})

	cluster.on('exit', (worker, code, signal) => {
		console.log(
			`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`
		)
		console.log('Starting a new worker')
		cluster.fork()
	})
}

const createCluster = (fn: any) => {
	if (cluster.isPrimary) {
		setupWorkerProcesses()
	} else {
		fn()
	}
}

const init = () => {
	initDb().then(() =>
		app.listen(port, () => {
			console.log(`App running on http://localhost:${port}`)
		})
	)
}

// createCluster(init)
init()
