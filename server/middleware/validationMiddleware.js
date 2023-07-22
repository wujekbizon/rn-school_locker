import { body, param, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/customErrors.js'
import mongoose from 'mongoose'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)
        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}

export const validateLocker = withValidationErrors([
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1 })
    .withMessage('Please use strong password: min 8 characters , min 1 uppercase letter, min 1 symbol'),
  body('title').notEmpty().withMessage('title is required').trim(),
  body('student').notEmpty().withMessage('student name is required').trim(),
  body('schoolName').notEmpty().withMessage('school name is required').trim(),
  body('classroom').notEmpty().withMessage('classroom is required').trim(),
  body('img').optional().isString().withMessage('image must be a string'),
  body('privacy').optional().isString().withMessage('must be a string'),
])

export const validateRumor = withValidationErrors([
  body('title')
    .notEmpty()
    .withMessage('title is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('title must be between 3 and 50 characters')
    .trim(),
  body('content')
    .notEmpty()
    .withMessage('content is required')
    .isLength({ min: 3, max: 150 })
    .withMessage('content must be between 3 and 150 characters')
    .trim(),
  body('likes').optional().isInt({ min: 0 }).withMessage('likes must be a positive integer'),
])

export const validatEmail = withValidationErrors([
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
])

export const validateIdParam = withValidationErrors([
  param('id')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid MongoDB id'),
])

export const validateRumorIdParam = withValidationErrors([
  param('rumorId')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid MongoDB id'),
])

export const validateUserIdParam = withValidationErrors([
  param('userId')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid MongoDB id'),
])
