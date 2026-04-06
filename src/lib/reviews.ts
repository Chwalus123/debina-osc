import { kv } from '@vercel/kv'

export type ReviewStatus = 'pending' | 'approved' | 'rejected'

export interface Review {
  id: string
  name: string
  location: string
  rating: number
  text: string
  status: ReviewStatus
  createdAt: string
}

export async function createReview(
  data: Pick<Review, 'name' | 'location' | 'rating' | 'text'>,
): Promise<Review> {
  const { nanoid } = await import('nanoid')
  const review: Review = {
    ...data,
    id: nanoid(),
    status: 'approved',
    createdAt: new Date().toISOString(),
  }
  await kv.set(`review:${review.id}`, JSON.stringify(review))
  const list: string[] = (await kv.get<string[]>('review:list')) ?? []
  list.unshift(review.id)
  await kv.set('review:list', list)
  return review
}

export async function getReview(id: string): Promise<Review | null> {
  const raw = await kv.get<string>(`review:${id}`)
  if (!raw) return null
  return typeof raw === 'string' ? JSON.parse(raw) : (raw as Review)
}

export async function getAllReviews(): Promise<Review[]> {
  const list: string[] = (await kv.get<string[]>('review:list')) ?? []
  const reviews = await Promise.all(list.map(id => getReview(id)))
  return reviews.filter((r): r is Review => r !== null)
}

export async function getApprovedReviews(): Promise<Review[]> {
  const all = await getAllReviews()
  return all.filter(r => r.status === 'approved')
}

export async function updateReviewStatus(id: string, status: ReviewStatus): Promise<Review | null> {
  const review = await getReview(id)
  if (!review) return null
  const updated = { ...review, status }
  await kv.set(`review:${id}`, JSON.stringify(updated))
  return updated
}

export async function deleteReview(id: string): Promise<void> {
  await kv.del(`review:${id}`)
  const list: string[] = (await kv.get<string[]>('review:list')) ?? []
  await kv.set('review:list', list.filter(i => i !== id))
}
