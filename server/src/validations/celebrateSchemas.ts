import { Joi } from 'celebrate'

const passLength = { min: 8, max: 20 }
const nameLength = { min: 3, max: 30 }

const schemas = {
	register: Joi.object({
		email: Joi.string().required().email({ tlds: false }).messages({
			'any.required': 'Error: E-mail is required',
			'string.empty': 'Error: E-mail cannot be empty',
			'string.email': 'Error: Please enter a valid e-mail address',
		}),
		name: Joi.string()
			.required()
			.min(nameLength.min)
			.max(passLength.max)
			.messages({
				'any.required': 'Error: Name is required',
				'string.empty': 'Error: Name cannot be empty',
				'string.min': `Error: Name must not exceed ${passLength.min} characters`,
				'string.max': `Error: Name must not exceed ${nameLength.max} characters`,
			}),
		password: Joi.string()
			.required()
			.min(passLength.min)
			.max(passLength.max)
			.messages({
				'any.required': 'Error: Password is required',
				'string.empty': 'Error: Password cannot be empty',
				'string.min': `Error: Password must be at least ${passLength.min} characters long`,
				'string.max': `Error: Password must not exceed ${passLength.max} characters`,
			}),
		repeatPassword: Joi.string()
			.required()
			.valid(Joi.ref('password'))
			.messages({
				'any.required': 'Error: Repeat Password is required',
				'string.empty': 'Error: Repeat Password cannot be empty',
				'any.only': 'Error: Repeat Password must match Password',
			}),
	}),
	login: Joi.object({
		email: Joi.string().required().messages({
			'any.required': 'Error: E-mail is required',
			'string.empty': 'Error: E-mail cannot be empty',
		}),
		password: Joi.string().required().messages({
			'any.required': 'Error: Password is required',
			'string.empty': 'Error: Password cannot be empty',
		}),
	}),
	'post-task': Joi.object({
		title: Joi.string().required().messages({
			'any.required': 'Error: title is required',
			'string.empty': 'Error: title cannot be empty',
		}),
		description: Joi.string().required().messages({
			'any.required': 'Error: description is required',
			'string.empty': 'Error: description cannot be empty',
		}),
		assignedUserId: Joi.string().required().messages({
			'any.required': 'Error: assignedUserId is required',
			'string.empty': 'Error: assignedUserId cannot be empty',
		}),
	}),
}

export default schemas
