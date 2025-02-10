import {
	Table,
	Column,
	Model,
	DataType,
	Default,
	PrimaryKey,
	AllowNull,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript'
import User from './users'
import { TaskAttributes, TaskCreationAttributes, TaskStatus } from '../types'

@Table({
	tableName: 'tasks',
	schema: 'TaskManagementSystem',
	timestamps: true,
})
class Task extends Model<TaskAttributes, TaskCreationAttributes> {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	id!: string

	@AllowNull(false)
	@Column(DataType.STRING(100))
	title!: string

	@AllowNull(false)
	@Column(DataType.STRING(500))
	description!: string

	@AllowNull
	@Default(TaskStatus.TODO)
	@Column(DataType.ENUM(...Object.values(TaskStatus)))
	status!: TaskStatus

	@ForeignKey(() => User)
	@AllowNull
	@Column(DataType.UUID)
	assignedUserId!: string

	@BelongsTo(() => User)
	assignedUser!: User
}

export default Task
