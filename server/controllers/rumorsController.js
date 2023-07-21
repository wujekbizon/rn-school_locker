import Rumor from '../models/Rumor.js'

export const getAllRumors = async (req, res) => {
  try {
    const rumors = await Rumor.find()
    res.status(200).json(rumors)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const getSingleRumor = async (req, res) => {
  const { id } = req.params
  try {
    const foundRumor = await Rumor.findById(id)
    if (!foundRumor) {
      return res.status(404).json({ message: `Can't find rumor with id: ${id}` })
    }
    res.status(200).json(foundRumor)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const createNewRumor = async (req, res) => {
  const { userId, title, content } = req.body

  if (!userId || !title || title.trim() === '' || !content || content.trim() === '') {
    return res.status(400).json({
      message: 'Content, and title are required',
    })
  }

  try {
    const rumor = await Rumor.create({
      userId,
      title,
      content,
    })

    res.status(201).json({
      message: 'Rumor created',
      rumor,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to create rumor, please try later!', error })
  }
}

export const editRumor = async (req, res) => {
  const { title, content } = req.body
  const { id } = req.params

  try {
    const updatedRumor = {
      title,
      content,
    }
    const editedRumor = await Rumor.findByIdAndUpdate(id, updatedRumor, { new: true })
    if (!editedRumor) {
      return res.status(404).json({ message: `Can't find rumor with id: ${id}` })
    }
    res.status(200).json({
      message: 'Rumor has been updated',
      updatedRumor,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update the rumor. Please try again.', error })
  }
}

export const deleteRumor = async (req, res) => {
  const { id } = req.params
  try {
    const removedRumor = await Rumor.findByIdAndDelete(id)
    if (!removedRumor) {
      return res.status(404).json({ message: `Can't find rumor with id: ${id}` })
    }
    res.status(200).json({ message: 'Rumor successfully deleted!', rumor: removedRumor })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
