import { Router } from 'express'
const router = Router()
import {
  getAllLockers,
  getSingleLocker,
  createNewLocker,
  editLocker,
  deleteLocker,
} from '../controllers/lockersController.js'
import { validateLocker } from '../middleware/validationMiddleware.js'

router.route('/').get(getAllLockers).post(validateLocker, createNewLocker)
router.route('/:id').get(getSingleLocker).patch(validateLocker, editLocker).delete(deleteLocker)

export default router
