import { Router } from 'express'
const router = Router({ mergeParams: true })

import {
  getAllRumors,
  getSingleRumor,
  createNewRumor,
  editRumor,
  deleteRumor,
} from '../controllers/rumorsController.js'

import { validateRumor, validateRumorIdParam, validateUserIdParam } from '../middleware/validationMiddleware.js'

router.route('/').get(getAllRumors)
router.route('/:userId').post(validateUserIdParam, validateRumor, createNewRumor)
router
  .route('/:userId/:rumorId')
  .get(validateRumorIdParam, getSingleRumor)
  .patch(validateRumorIdParam, validateRumor, editRumor)
  .delete(validateRumorIdParam, deleteRumor)

export default router
