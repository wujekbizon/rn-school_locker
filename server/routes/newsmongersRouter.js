import { Router } from 'express'
const router = Router()

import {
  getAllSubscriptions,
  subscribeToNewsmongers,
  unsubscribeNewsmongers,
} from '../controllers/newsmongersController.js'

router.route('/').get(getAllSubscriptions).post(subscribeToNewsmongers)
router.route('/:id').delete(unsubscribeNewsmongers)

export default router
