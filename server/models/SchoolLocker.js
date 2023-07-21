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
    privacy: {
      type: String,
      enum: ['private', 'public'],
      default: 'public',
    },
  },
  { timestamps: true, collection: 'lockers' }
)

export default mongoose.model('SchoolLocker', SchoolLocker)
