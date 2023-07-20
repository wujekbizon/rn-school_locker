import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import morgan from 'morgan'
import isValidEmail from './utils/emailValidation.js'
import { connectToDatabase } from './utils/db.js'

// schemas
import SchoolLocker from './models/SchoolLocker.js'
import Newsmonger from './models/Newsmonger.js'
import Rumor from './models/Rumor.js'

const app = express()

// connect mongodb with mongoose
await connectToDatabase('rn-lockers')

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())

app.get('/lockers', async (req, res) => {
  try {
    const lockers = await SchoolLocker.find()
    res.status(200).json(lockers)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

app.get('/rumors', async (req, res) => {
  try {
    const rumors = await Rumor.find()
    res.status(200).json(rumors)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

app.post('/newsmongers', async (req, res) => {
  const { email } = req.body
  const validEmail = isValidEmail(email)
  if (!email || !validEmail) {
    return res.status(400).json({ message: 'Please provide valid email' })
  }

  const registeredEmail = new Newsmonger({ email })

  try {
    await registeredEmail.save()
    res.status(201).json({
      message: 'Thank you for signing to our daily newsmonger!',
      registeredEmail,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to register email, please try later!', error: error.message })
  }
})

app.post('/rumors', async (req, res) => {
  const { userId, title, content } = req.body

  if (!userId || !title || title.trim() === '' || !content || content.trim() === '') {
    return res.status(400).json({
      message: 'Content, and title are required',
    })
  }

  const rumor = new Rumor({
    userId,
    title,
    content,
    likes: 0,
  })

  try {
    await rumor.save()
    res.status(201).json({
      message: 'Rumor created',
      rumor,
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

app.post('/create', async (req, res) => {
  const { email, password, title, student, school, classroom, img } = req.body

  if (!email || !password || !title) {
    return res.status(400).json({ message: 'Email, password, and title are required' })
  }

  const locker = new SchoolLocker({
    email,
    password,
    title,
    student,
    school,
    classroom,
    img,
  })

  try {
    await locker.save()
    res.status(201).json({
      message: 'Locker created',
      locker,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to create locker, please try later!', error })
  }
})

// listen on port 5100
const port = process.env.PORT || 5100

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})
