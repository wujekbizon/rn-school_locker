import mongoose from 'mongoose'
const { Schema } = mongoose

const Rumor = new Schema(
  {
    userId: String,
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'rumors' }
)

export default mongoose.model('Rumor', Rumor)
