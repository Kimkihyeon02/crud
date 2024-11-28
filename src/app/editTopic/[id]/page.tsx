import { auth } from '@/auth'
import EditTopicForm from '@/components/EditTopicForm'
import { redirect } from 'next/navigation'

// 요청 스코프 내부에서 데이터 처리
export default async function EditTopic({
  params,
}: {
  params: { id: string }
}) {
  // 세션 인증
  const session = await auth()
  if (!session) {
    redirect('/login') // 세션이 없으면 로그인 페이지로 리다이렉트
    return null
  }

  // 토픽 데이터 가져오기
  const apiUrl = process.env.API_URL
  const { id } = params

  try {
    const res = await fetch(`${apiUrl}/api/topics/${id}`, {
      cache: 'no-store', // 최신 데이터 유지
    })

    if (!res.ok) {
      throw new Error('Failed to fetch topic.')
    }

    const { topic } = await res.json()
    const { title, description } = topic

    // 성공적으로 데이터를 렌더링
    return <EditTopicForm id={id} title={title} description={description} />
  } catch (error) {
    console.error('Error fetching topic:', error)

    // 에러가 Error 인스턴스인 경우 message를 참조
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred'

    // 에러 페이지로 대체 가능
    return <div>Error loading topic: {errorMessage}</div>
  }
}
