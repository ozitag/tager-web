/**
 * Reference - The regex used in input with type="email" from W3C HTML Living Standard:
 * https://html.spec.whatwg.org/multipage/input.html#e-mail-state-(type=email)
 */
export const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const requiredMessage = 'Вы не заполнили поле';

export const validators = {
  required(value: string) {
    return !value.trim();
  },
  email(value: string) {
    return !EMAIL_REGEXP.test(value);
  },
};
