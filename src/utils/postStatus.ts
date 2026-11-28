import type { PostItem, PostStatus } from '@/types/api'

// Quantidade de posts por status, para os resumos dos painéis
export function countByStatus(posts: PostItem[]): Record<PostStatus, number> {
  const counts: Record<PostStatus, number> = { draft: 0, review: 0, approved: 0, denied: 0, published: 0 }
  for (const post of posts) counts[post.status] = (counts[post.status] ?? 0) + 1
  return counts
}
