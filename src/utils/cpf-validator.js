/*!
 * Código retirado do pacote npm cpf-cnpj-validator (https://www.npmjs.com/package/cpf-cnpj-validator), para evitar dependências antigas do pacote no npm e retornar o cpf formatado após passar no validator/joi.
 * https://github.com/carvalhoviniciusluiz/cpf-cnpj-validator/issues/29
 * cpf-cnpj-validator v1.0.3
 * (c) 2020-present Carvalho, Vinicius Luiz <carvalho.viniciusluiz@gmail.com>
 * Released under the MIT License.
 */
const BLACKLIST = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
  '12345678909'
];
const STRICT_STRIP_REGEX = /[.-]/g;
const LOOSE_STRIP_REGEX = /[^\d]/g;
const verifierDigit = (digits) => {
  const numbers = digits
      .split('')
      .map(number => {
      return parseInt(number, 10);
  });
  const modulus = numbers.length + 1;
  const multiplied = numbers.map((number, index) => number * (modulus - index));
  const mod = multiplied.reduce((buffer, number) => buffer + number) % 11;
  return (mod < 2 ? 0 : 11 - mod);
};
const strip = (number, strict) => {
  const regex = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
  return (number || '').replace(regex, '');
};
const format = (number) => {
  return strip(number).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
};
const isValid = (number, strict) => {
  const stripped = strip(number, strict);
  if (!stripped) {
      return false;
  }
  if (stripped.length !== 11) {
      return false;
  }
  if (BLACKLIST.includes(stripped)) {
      return false;
  }
  let numbers = stripped.substr(0, 9);
  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);
  return numbers.substr(-2) === stripped.substr(-2);
};
const generate = (formatted) => {
  let numbers = '';
  for (let i = 0; i < 9; i += 1) {
      numbers += Math.floor(Math.random() * 9);
  }
  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);
  return (formatted ? format(numbers) : numbers);
};
var cpf = {
  verifierDigit,
  strip,
  format,
  isValid,
  generate,
};

const validator = joi => ({
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
              return format(value);
          }
      },
  }
});

export default validator;
export { cpf, validator };
