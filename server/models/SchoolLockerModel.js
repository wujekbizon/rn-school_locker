import mongoose from 'mongoose'
import { PRIVACY, DEFAULT_IMAGE } from '../utils/constanst.js'
const { Schema } = mongoose

const SchoolLocker = new Schema(
  {
    email: String,
    password: String,
    title: String,
    student: String,
    schoolName: String,
    classroom: String,
    img: { type: String, default: DEFAULT_IMAGE },
    privacy: {
      type: String,
      enum: Object.values(PRIVACY),
      default: PRIVACY.PUBLIC,
    },
  },
  { timestamps: true, collection: 'lockers' }
)

export default mongoose.model('SchoolLocker', SchoolLocker)
