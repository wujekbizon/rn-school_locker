import { Router } from 'express'
const router = Router()

import {
  getAllSubscriptions,
  subscribeToNewsmongers,
  unsubscribeNewsmongers,
} from '../controllers/newsmongersController.js'
import { validatEmail } from '../middleware/validationMiddleware.js'

router.route('/').get(getAllSubscriptions).post(validatEmail, subscribeToNewsmongers)
router.route('/:id').delete(unsubscribeNewsmongers)

export default router
