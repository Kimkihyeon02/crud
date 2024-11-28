import conncetMongoDB from '@/libs/mongodb'
import Log from '@/models/log'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    await conncetMongoDB()
    await Log.create({ email })
    return NextResponse.json({ message: 'Login event logged' }, { status: 201 })
  } catch (error) {
    console.error('Error loggin login event', error)
  }
}
