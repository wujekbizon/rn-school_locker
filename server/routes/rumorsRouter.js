import { Router } from 'express'
const router = Router()

import {
  getAllRumors,
  getSingleRumor,
  createNewRumor,
  editRumor,
  deleteRumor,
} from '../controllers/rumorsController.js'

router.route('/').get(getAllRumors).post(createNewRumor)
router.route('/:id').get(getSingleRumor).patch(editRumor).delete(deleteRumor)

export default router
