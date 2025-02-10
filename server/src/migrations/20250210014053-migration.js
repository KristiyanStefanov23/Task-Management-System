'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('users', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.fn('gen_random_uuid'),
				primaryKey: true,
				allowNull: false,
			},
			admin: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING(30),
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(254),
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.CHAR(60),
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now'),
			},
		})

		await queryInterface.createTable('tasks', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.fn('gen_random_uuid'),
				primaryKey: true,
				allowNull: false,
			},
			title: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING(500),
				allowNull: false,
			},
			status: {
				type: Sequelize.ENUM('TODO', 'IN_PROGRESS', 'DONE'),
				defaultValue: 'TODO',
				allowNull: false,
			},
			assignedUserId: {
				type: Sequelize.UUID,
				allowNull: true,
				references: {
					model: 'users',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now'),
			},
		})
	},

	async down(queryInterface) {
		await queryInterface.dropTable('tasks')
		await queryInterface.dropTable('users')
	},
}
