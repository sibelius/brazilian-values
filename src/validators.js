import moment from 'moment'
import { getDateFormat, getConstructor } from './helpers'

/**
 * Valida se o construtor do valor é o especificado.
 * @example ```
 * (12, 'Number') => true
 * ({ name: 'Lucas' }, 'Object') => true
 * ([2, 3], 'Set') => false
 * ```
 * @param {*} value
 * @param {String} constructor
 * @returns {Boolean}
 */
export const is = (value, constructor) => {
  const isEquals = constructor === getConstructor(value)
  return isEquals
}

export const isCPF = (cpf) => {
  const isInvalid = (cpf, rest, pos) => rest !== parseInt(cpf.substring(pos, pos + 1))

  const sumDigit = (cpf, digit) => 11 - (cpf.substring(0, digit).split('').reduce((acc, curr, index) => {
    acc += parseInt(curr) * ((digit + 1) - index)
    return acc
  }, 0) % 11)

  const getRest = sum => sum > 9 ? 0 : sum

  if (!is(cpf, 'String')) return false

  cpf = cpf.replace(/[\D]/gi, '')

  if (!cpf.match(/^\d+$/)) return false

  if (cpf === '00000000000' || cpf.length !== 11) return false

  if (isInvalid(cpf, getRest(sumDigit(cpf, 9)), 9)) return false

  if (isInvalid(cpf, getRest(sumDigit(cpf, 10)), 10)) return false

  return true
}

/**
 * Valida se é uma data com o formato especificado ou, quando não especificado,
 * valida se é um dos formatos 'DD/MM/YYYY', 'DD-MM-YYYY' e 'YYYY-MM-DD'.
 * @example ```
 * ('3/102/2006') => false
 * ('31/02/2006') => false
 * ('21/12/2006') => true
 * ('21/12/2006', 'YYYY-MM-DD') => false
 * ```
 * @param {String} date
 * @param {String} [format]
 * @returns {Boolean}
 */
export const isDate = (date, format = null) => {
  const from = format || getDateFormat(date)
  const isValid = from ? moment(date, from).isValid() : false
  return isValid
}