import { StatusCodes } from 'http-status-codes'
import Rumor from '../models/RumorModel.js'
import { NotFoundError } from '../errors/customErrors.js'

export const getAllRumors = async (req, res) => {
  const rumors = await Rumor.find({})

  res.status(StatusCodes.OK).json(rumors)
}

export const getSingleRumor = async (req, res) => {
  const { rumorId } = req.params
  console.log(rumorId)
  const foundRumor = await Rumor.findById(rumorId)
  if (!foundRumor) throw new NotFoundError(`Can't find rumor with id: ${rumorId}`)

  res.status(StatusCodes.OK).json(foundRumor)
}

export const createNewRumor = async (req, res) => {
  const { userId } = req.params
  console.log(userId)
  const { title, content } = req.body

  const rumor = await Rumor.create({ userId, title, content })

  res.status(StatusCodes.CREATED).json({ message: 'Rumor created', rumor })
}

export const editRumor = async (req, res) => {
  const { rumorId } = req.params

  const updatedRumor = req.body

  const editedRumor = await Rumor.findByIdAndUpdate(rumorId, updatedRumor, { new: true })
  if (!editedRumor) throw new NotFoundError(`Can't find rumor with id: ${rumorId}`)

  res.status(StatusCodes.OK).json({ message: 'Rumor has been updated', updatedRumor })
}

export const deleteRumor = async (req, res) => {
  const { rumorId } = req.params

  const removedRumor = await Rumor.findByIdAndDelete(rumorId)
  if (!removedRumor) throw new NotFoundError(`Can't find rumor with id: ${rumorId}`)

  res.status(StatusCodes.OK).json({ message: 'Rumor successfully deleted!', rumor: removedRumor })
}
