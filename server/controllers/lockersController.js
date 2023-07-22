import { StatusCodes } from 'http-status-codes'
import SchoolLocker from '../models/SchoolLockerModel.js'
import { NotFoundError } from '../errors/customErrors.js'
import { hashPassword } from '../utils/auth.js'

export const getAllLockers = async (req, res) => {
  const lockers = await SchoolLocker.find({})

  res.status(StatusCodes.OK).json(lockers)
}

export const getSingleLocker = async (req, res) => {
  const { id } = req.params

  const foundLocker = await SchoolLocker.findById(id)
  if (!foundLocker) throw new NotFoundError(`Can't find locker with id: ${id}`)

  res.status(StatusCodes.OK).json(foundLocker)
}

export const createNewLocker = async (req, res) => {
  const { email, password, title, student, school, classroom, img, privacy } = req.body

  const allLockers = await SchoolLocker.find({})
  const isLockerAlreadyRegistered = allLockers.some((locker) => {
    return locker.email === email
  })

  if (isLockerAlreadyRegistered) {
    return res.status(StatusCodes.CONFLICT).json({ message: 'Email address already used! Please enter another email' })
  }

  const hashedPassword = await hashPassword(password)
  const locker = await SchoolLocker.create({
    email,
    password: hashedPassword,
    title,
    student,
    school,
    classroom,
    img,
    privacy,
  })

  res.status(StatusCodes.CREATED).json({ message: 'Locker created', locker })
}

export const editLocker = async (req, res) => {
  const { id } = req.params

  const editedLocker = await SchoolLocker.findByIdAndUpdate(id, req.body, { new: true })

  if (!editedLocker) throw new NotFoundError(`Can't find locker with id: ${id}`)

  res.status(StatusCodes.OK).json({ message: 'Locker has been updated', editedLocker })
}

export const deleteLocker = async (req, res) => {
  const { id } = req.params
  const removedLocker = await SchoolLocker.findByIdAndDelete(id)

  if (!removedLocker) throw new NotFoundError(`Can't find locker with id: ${id}`)

  res.status(StatusCodes.OK).json({ message: 'Successfully deleted locker!', locker: removedLocker })
}
