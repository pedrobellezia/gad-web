import { useModals } from './useModals'
import type { PostItem } from '@/types/api'

const MAX_TITLE = 255
const SUFFIX = ' (cópia)'

/**
 * Abre a criação de post preenchida com o conteúdo de outro post (ex.: um reprovado),
 * para o redator revisar antes de criar. O original não é alterado.
 */
export function usePostDuplication() {
  const { openCreatePostModal, closePostDetailModal } = useModals()

  function duplicateAsDraft(post: PostItem) {
    const title = post.title.length + SUFFIX.length > MAX_TITLE
      ? post.title.slice(0, MAX_TITLE - SUFFIX.length) + SUFFIX
      : post.title + SUFFIX

    closePostDetailModal()
    openCreatePostModal({
      title,
      content: post.content,
      client_id: post.client_id,
      medias: [...post.medias]
        .sort((a, b) => a.position - b.position)
        .map((pm, idx) => ({ media_id: pm.media.id, position: idx }))
    })
  }

  return { duplicateAsDraft }
}
