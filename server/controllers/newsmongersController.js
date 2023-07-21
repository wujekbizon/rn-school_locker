import Newsmonger from '../models/Newsmonger.js'
import isValidEmail from '../utils/emailValidation.js'

export const getAllSubscriptions = async (req, res) => {
  try {
    const emails = await Newsmonger.find()
    res.status(200).json(emails)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const subscribeToNewsmongers = async (req, res) => {
  const { email } = req.body
  const validEmail = isValidEmail(email)
  if (!email || !validEmail) {
    return res.status(400).json({ message: 'Please provide valid email' })
  }

  const allEmails = await Newsmonger.find()
  const isRegistered = allEmails.some((item) => {
    return item.email === email
  })

  if (isRegistered) {
    return res.status(409).json({ message: 'Email address already registered!' })
  }

  try {
    const registeredEmail = await Newsmonger.create({ email })
    res.status(201).json({
      message: 'Thank you for signing to our daily newsmonger!',
      registeredEmail,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to register email, please try later!', error: error.message })
  }
}

export const unsubscribeNewsmongers = async (req, res) => {
  const { id } = req.params
  try {
    await Newsmonger.findByIdAndDelete(id)
    res.status(201).json({ message: 'Unsubscribed successfully from newsmongers' })
  } catch (error) {
    res.status(500).json({ message: `Can't find email with id: <${id}>` })
  }
}
