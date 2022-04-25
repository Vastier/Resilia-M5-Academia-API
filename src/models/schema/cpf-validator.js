import { cpf } from 'cpf-cnpj-validator'

export { cpf }

export const validator = joi => ({
  type: 'document',
  base: joi.string(),
  messages: {
    'document.cpf': 'CPF inválido',
  },
  rules: {
    cpf: {
      validate(value, helpers, args, options) {
        if (!cpf.isValid(value)) {
          return helpers.error('document.cpf');
        }

        return cpf.format(value)
      }
    }
  }
});

export default validator;