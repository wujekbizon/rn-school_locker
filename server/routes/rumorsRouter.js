import { Router } from 'express'
const router = Router({ mergeParams: true })

import {
  getAllRumors,
  getSingleRumor,
  createNewRumor,
  editRumor,
  deleteRumor,
} from '../controllers/rumorsController.js'

import { validateRumor } from '../middleware/validationMiddleware.js'

router.route('/').get(getAllRumors)
router.route('/:userId').post(validateRumor, createNewRumor)
router.route('/:userId/:rumorId').get(getSingleRumor).patch(validateRumor, editRumor).delete(deleteRumor)

export default router
