import { Router } from 'express'
const router = Router()
import {
  getAllLockers,
  getSingleLocker,
  createNewLocker,
  editLocker,
  deleteLocker,
} from '../controllers/lockersController.js'

router.route('/').get(getAllLockers).post(createNewLocker)
router.route('/:id').get(getSingleLocker).patch(editLocker).delete(deleteLocker)

export default router
