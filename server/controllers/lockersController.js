import { StatusCodes } from 'http-status-codes'
import SchoolLocker from '../models/SchoolLockerModel.js'
import { hashPassword, verifyPassword } from '../utils/auth.js'
import { UnauthenticatedError } from '../errors/customErrors.js'
import { createJWT } from '../utils/jwtToken.js'
import { ONE_DAY } from '../utils/constanst.js'

export const getAllLockers = async (req, res) => {
  console.log(req)
  const lockers = await SchoolLocker.find({})
  res.status(StatusCodes.OK).json(lockers)
}

export const getSingleLocker = async (req, res) => {
  const { id } = req.params
  const foundLocker = await SchoolLocker.findById(id)
  res.status(StatusCodes.OK).json(foundLocker)
}

export const createNewLocker = async (req, res) => {
  const isFirstAccount = (await SchoolLocker.countDocuments()) === 0

  const hashedPassword = await hashPassword(req.body.password)
  const locker = await SchoolLocker.create({
    ...req.body,
    password: hashedPassword,
    role: isFirstAccount ? 'admin' : 'user',
  })

  const { password, ...responseLocker } = locker._doc
  res.status(StatusCodes.CREATED).json({ message: 'Locker created', locker: responseLocker })
}

export const editLocker = async (req, res) => {
  const { id } = req.params
  const editedLocker = await SchoolLocker.findByIdAndUpdate(id, req.body, { new: true })
  res.status(StatusCodes.OK).json({ message: 'Locker has been updated', editedLocker })
}

export const deleteLocker = async (req, res) => {
  const { id } = req.params
  const removedLocker = await SchoolLocker.findByIdAndDelete(id)
  res.status(StatusCodes.OK).json({ message: 'Successfully deleted locker!', locker: removedLocker })
}

export const login = async (req, res) => {
  const foundLocker = await SchoolLocker.findOne({ email: req.body.email })

  const isValidLocker = foundLocker && (await verifyPassword(req.body.password, foundLocker.password))
  if (!isValidLocker) throw new UnauthenticatedError('Invalid credentials!')

  const { password, ...responseLocker } = foundLocker._doc

  // one approach is to send token with the response but I'm not using that
  const token = createJWT({ lockerId: foundLocker._id, role: foundLocker.role })
  // other approach is to send http only cookie

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
    secure: process.env.NODE_ENV === 'production',
  })
  res.status(StatusCodes.OK).json({ message: 'Successfully logged in!', locker: responseLocker })
}
