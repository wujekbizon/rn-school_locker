import { Router } from 'express'
const router = Router()

import {
  getAllSubscriptions,
  subscribeToNewsmongers,
  unsubscribeNewsmongers,
} from '../controllers/newsmongersController.js'
import { validatEmail, validateNewsmongerIdParam } from '../middleware/validationMiddleware.js'

router.route('/').get(getAllSubscriptions).post(validatEmail, subscribeToNewsmongers)
router.route('/:id').delete(validateNewsmongerIdParam, unsubscribeNewsmongers)

export default router
