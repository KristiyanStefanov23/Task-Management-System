import {
	Table,
	Column,
	Model,
	DataType,
	Default,
	PrimaryKey,
	AllowNull,
	Unique,
	HasMany,
} from 'sequelize-typescript'
import Task from './tasks'
import { UserAttributes, UserCreationAttributes } from '../types/users/users'

@Table({
	tableName: 'users',
	schema: 'TaskManagementSystem',
	timestamps: true,
})
class User extends Model<UserAttributes, UserCreationAttributes> {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	id!: string

	@Default(false)
	@Column(DataType.BOOLEAN)
	admin!: boolean

	@AllowNull(false)
	@Column(DataType.STRING(30))
	name!: string

	@AllowNull(false)
	@Unique
	@Column(DataType.STRING(254))
	email!: string

	@AllowNull(false)
	@Column(DataType.CHAR(60))
	password!: string

	@HasMany(() => Task)
	tasks!: Task[]
}

export default User
