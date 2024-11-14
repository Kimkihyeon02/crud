import conncetMongoDB from '@/libs/mongodb'
import Topic from '@/models/topic'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json()
    if (!title || !description) {
      return NextResponse.json(
        { message: 'Title and Description are required' },
        { status: 400 }
      )
    }
    await conncetMongoDB()
    await Topic.create({ title, description })
    return NextResponse.json({ message: 'Topic created' }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/topics', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await conncetMongoDB()
    const topics = await Topic.find()
    return NextResponse.json({ topics })
  } catch (error) {
    console.error('Error in GET /api/topics:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }
    await conncetMongoDB()
    const deletedTopic = await Topic.findByIdAndDelete(id)
    if (!deletedTopic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Topic deleted' }, { status: 200 })
  } catch (error) {
    console.error('Error in DELETE /api/topics:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
