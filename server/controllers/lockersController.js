import SchoolLocker from '../models/SchoolLocker.js'

export const getAllLockers = async (req, res) => {
  try {
    const lockers = await SchoolLocker.find({})
    res.status(200).json(lockers)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const getSingleLocker = async (req, res) => {
  const { id } = req.params
  try {
    const foundLocker = await SchoolLocker.findById(id)
    if (!foundLocker) {
      return res.status(404).json({ message: `Can't find locker with id: ${id}` })
    }
    res.status(200).json(foundLocker)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const createNewLocker = async (req, res) => {
  const { email, password, title, student, school, classroom, img, privacy } = req.body

  if (!email || !password || !title) {
    return res.status(400).json({ message: 'Email, password, and title are required' })
  }

  try {
    const locker = await SchoolLocker.create({
      email,
      password,
      title,
      student,
      school,
      classroom,
      img,
      privacy,
    })
    res.status(201).json({
      message: 'Locker created',
      locker,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to create locker, please try later!', error })
  }
}

export const editLocker = async (req, res) => {
  const { email, password, title, student, school, classroom, img } = req.body
  const { id } = req.params

  try {
    const updatedLocker = {
      email,
      password,
      title,
      student,
      school,
      classroom,
      img,
    }

    const editedLocker = await SchoolLocker.findByIdAndUpdate(id, updatedLocker, {
      new: true,
    })

    if (!editedLocker) {
      return res.status(404).json({ message: `Can't find locker with id: ${id}` })
    }
    res.status(200).json({
      message: 'Locker has been updated',
      updatedLocker,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update the locker. Please try again.', error })
  }
}

export const deleteLocker = async (req, res) => {
  const { id } = req.params
  try {
    const removedLocker = await SchoolLocker.findByIdAndDelete(id)
    if (!removedLocker) {
      return res.status(404).json({ message: `Can't find locker with id: ${id}` })
    }
    res.status(200).json({ message: 'Successfully deleted locker!', locker: removedLocker })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
