"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const passLength = { min: 8, max: 20 };
const nameLength = { min: 3, max: 30 };
const schemas = {
    register: celebrate_1.Joi.object({
        email: celebrate_1.Joi.string().required().email({ tlds: false }).messages({
            'any.required': 'Error: E-mail is required',
            'string.empty': 'Error: E-mail cannot be empty',
            'string.email': 'Error: Please enter a valid e-mail address',
        }),
        name: celebrate_1.Joi.string()
            .required()
            .min(nameLength.min)
            .max(passLength.max)
            .messages({
            'any.required': 'Error: Name is required',
            'string.empty': 'Error: Name cannot be empty',
            'string.min': `Error: Name must not exceed ${passLength.min} characters`,
            'string.max': `Error: Name must not exceed ${nameLength.max} characters`,
        }),
        password: celebrate_1.Joi.string()
            .required()
            .min(passLength.min)
            .max(passLength.max)
            .messages({
            'any.required': 'Error: Password is required',
            'string.empty': 'Error: Password cannot be empty',
            'string.min': `Error: Password must be at least ${passLength.min} characters long`,
            'string.max': `Error: Password must not exceed ${passLength.max} characters`,
        }),
        repeatPassword: celebrate_1.Joi.string()
            .required()
            .valid(celebrate_1.Joi.ref('password'))
            .messages({
            'any.required': 'Error: Repeat Password is required',
            'string.empty': 'Error: Repeat Password cannot be empty',
            'any.only': 'Error: Repeat Password must match Password',
        }),
    }),
    login: celebrate_1.Joi.object({
        email: celebrate_1.Joi.string().required().messages({
            'any.required': 'Error: E-mail is required',
            'string.empty': 'Error: E-mail cannot be empty',
        }),
        password: celebrate_1.Joi.string().required().messages({
            'any.required': 'Error: Password is required',
            'string.empty': 'Error: Password cannot be empty',
        }),
    }),
    'post-task': celebrate_1.Joi.object({
        title: celebrate_1.Joi.string().required().messages({
            'any.required': 'Error: title is required',
            'string.empty': 'Error: title cannot be empty',
        }),
        description: celebrate_1.Joi.string().required().messages({
            'any.required': 'Error: description is required',
            'string.empty': 'Error: description cannot be empty',
        }),
        assignedUserId: celebrate_1.Joi.string().required().messages({
            'any.required': 'Error: assignedUserId is required',
            'string.empty': 'Error: assignedUserId cannot be empty',
        }),
    }),
};
exports.default = schemas;
