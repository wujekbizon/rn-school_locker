import mongoose from 'mongoose'
const { Schema } = mongoose

const Rumor = new Schema(
  {
    userId: String,
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, collection: 'rumors' }
)

export default mongoose.model('Rumor', Rumor)
