import { Router } from 'express'
const router = Router()

import {
  getAllSubscriptions,
  subscribeToNewsmongers,
  unsubscribeNewsmongers,
} from '../controllers/newsmongersController.js'
import { validatEmail, validateIdParam } from '../middleware/validationMiddleware.js'

router.route('/').get(getAllSubscriptions).post(validatEmail, subscribeToNewsmongers)
router.route('/:id').delete(validateIdParam, unsubscribeNewsmongers)

export default router
