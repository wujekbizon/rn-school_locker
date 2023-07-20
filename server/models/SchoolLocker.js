import mongoose from 'mongoose'
const { Schema } = mongoose

const SchoolLocker = new Schema(
  {
    email: String,
    password: String,
    title: String,
    student: String,
    schoolName: String,
    classroom: String,
    img: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'lockers' }
)

export default mongoose.model('SchoolLocker', SchoolLocker)
