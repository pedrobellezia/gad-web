import { ref } from 'vue'
import type { PostItem } from './usePosts'

const approvalModalOpen = ref<boolean>(false)
const currentApprovalAction = ref<string>('')

const createPostModalOpen = ref<boolean>(false)
const editPostModalOpen = ref<boolean>(false)
const selectedPostForEdit = ref<PostItem | null>(null)

const reportModalOpen = ref<boolean>(false)

export function useModals() {
  function openApprovalModal(action: string) {
    currentApprovalAction.value = action
    approvalModalOpen.value = true
  }

  function closeApprovalModal() {
    approvalModalOpen.value = false
  }

  function openCreatePostModal() {
    createPostModalOpen.value = true
  }

  function closeCreatePostModal() {
    createPostModalOpen.value = false
  }

  function openEditPostModal(post: PostItem | null = null) {
    selectedPostForEdit.value = post
    editPostModalOpen.value = true
  }

  function closeEditPostModal() {
    editPostModalOpen.value = false
    selectedPostForEdit.value = null
  }

  function openReportModal() {
    reportModalOpen.value = true
  }

  function closeReportModal() {
    reportModalOpen.value = false
  }

  return {
    approvalModalOpen,
    currentApprovalAction,
    openApprovalModal,
    closeApprovalModal,

    createPostModalOpen,
    openCreatePostModal,
    closeCreatePostModal,

    editPostModalOpen,
    selectedPostForEdit,
    openEditPostModal,
    closeEditPostModal,

    reportModalOpen,
    openReportModal,
    closeReportModal
  }
}
