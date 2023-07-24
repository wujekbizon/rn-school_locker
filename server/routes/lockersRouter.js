import { Router } from 'express'
const router = Router()
import {
  getAllLockers,
  getSingleLocker,
  createNewLocker,
  editLocker,
  deleteLocker,
  login,
} from '../controllers/lockersController.js'
import { validateLocker, validateIdParam, validateLogin } from '../middleware/validationMiddleware.js'

router.route('/').get(getAllLockers).post(validateLocker, createNewLocker)
router.route('/login').post(validateLogin, login)
router
  .route('/:id')
  .get(validateIdParam, getSingleLocker)
  .patch(validateIdParam, validateLocker, editLocker)
  .delete(validateIdParam, deleteLocker)

export default router
