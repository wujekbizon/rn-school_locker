import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import morgan from 'morgan'
import { connectToDatabase } from './utils/db.js'
const app = express()

// routers
import lockersRouter from './routes/lockersRouter.js'
import rumorsRouter from './routes/rumorsRouter.js'
import newsmongerRouter from './routes/newsmongersRouter.js'

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())

app.use('/api/v1/lockers', lockersRouter)
app.use('/api/v1/rumors', rumorsRouter)
app.use('/api/v1/newsmongers', newsmongerRouter)

// Not found middleware
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not found' })
})

// Error Middleware
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ message: 'Something went wrong!' })
})

const port = process.env.PORT || 5100
// connect mongodb with mongoose
try {
  await connectToDatabase('rn-lockers')
  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
