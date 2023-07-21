import mongoose from 'mongoose'
const { Schema } = mongoose

const Newsmonger = new Schema(
  {
    email: { type: String, required: true },
  },
  { timestamps: true, collection: 'newsmongers' }
)

export default mongoose.model('Newsmonger', Newsmonger)
