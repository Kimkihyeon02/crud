import mongoose from 'mongoose'

export default async function conncetMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error(error)
  }
}
