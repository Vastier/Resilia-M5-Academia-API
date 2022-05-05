import JoiBase from "joi"
import validator from "../../utils/cpf-validator.js";


const Joi = JoiBase.extend(validator);


export const cadastroSchema = Joi.object({
	nome: Joi.string()
		.messages({
			'string.empty': 'Nome está vazio'
		})
		.required(),

	cpf: Joi.document()
		.cpf()
		.messages({
			'document.cpf': 'CPF inválido, aceitamos no padrão xxx.xxx.xxx-xx ou somente os números'
		})
		.required(),

	email: Joi.string()
		.email({tlds: false})
		.messages({
			'string.email': 'Email inválido'
		})
		.required(),

	senha: Joi.string()
		// .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
		.required(),

})


export const loginSchema = Joi.object({

	email: Joi.string()
		.email({tlds: false})
		.messages({
			'string.email': 'Email inválido'
		})
		.required(),

	senha: Joi.string()
		// .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
		.required(),

})

