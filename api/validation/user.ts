import Joi from 'joi';
import { LOGIN_LENGTH, FULL_NAME_LENGTH, PASSWORD_LENGTH } from '../consts/validation';

const loginSchema = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object().keys({
  login: Joi.string().required().min(LOGIN_LENGTH.min).max(LOGIN_LENGTH.max),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(PASSWORD_LENGTH.min).max(PASSWORD_LENGTH.max),
  fullName: Joi.string().required().min(FULL_NAME_LENGTH.min).max(FULL_NAME_LENGTH.max),
});

const sendPasswordConfirmationSchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

const confirmPasswordSchema = Joi.object().keys({
  password: Joi.string().required().min(PASSWORD_LENGTH.min).max(PASSWORD_LENGTH.max),
});

export { loginSchema, registerSchema, sendPasswordConfirmationSchema, confirmPasswordSchema };
