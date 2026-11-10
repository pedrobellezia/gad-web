import { ref } from 'vue'
import type { PostItem, MediaItem } from '@/types/api'

const createPostModalOpen = ref(false)
const editPostModalOpen = ref(false)
const approvalModalOpen = ref(false)
const changePasswordModalOpen = ref(false)
const restoreAccountModalOpen = ref(false)
const postDetailModalOpen = ref(false)
const uploadMediaModalOpen = ref(false)
const mediaDetailModalOpen = ref(false)
const reportModalOpen = ref(false)

const selectedPostForEdit = ref<PostItem | null>(null)
const selectedPostForDetail = ref<PostItem | null>(null)
const selectedPostForApproval = ref<PostItem | null>(null)
const selectedMediaForEdit = ref<MediaItem | null>(null)
const selectedMediaForDetail = ref<MediaItem | null>(null)
const currentApprovalAction = ref<'approve' | 'deny'>('approve')

export function useModals() {
  function openCreatePostModal() {
    createPostModalOpen.value = true
  }
  function closeCreatePostModal() {
    createPostModalOpen.value = false
  }

  function openEditPostModal(post: PostItem) {
    selectedPostForEdit.value = post
    editPostModalOpen.value = true
  }
  function closeEditPostModal() {
    selectedPostForEdit.value = null
    editPostModalOpen.value = false
  }

  function openApprovalModal(post: PostItem, action: 'approve' | 'deny') {
    selectedPostForApproval.value = post
    currentApprovalAction.value = action
    approvalModalOpen.value = true
  }
  function closeApprovalModal() {
    selectedPostForApproval.value = null
    approvalModalOpen.value = false
  }

  function openPostDetailModal(post: PostItem) {
    selectedPostForDetail.value = post
    postDetailModalOpen.value = true
  }
  function closePostDetailModal() {
    selectedPostForDetail.value = null
    postDetailModalOpen.value = false
  }

  function openUploadMediaModal() {
    uploadMediaModalOpen.value = true
  }
  function closeUploadMediaModal() {
    uploadMediaModalOpen.value = false
  }

  function openMediaDetailModal(media: MediaItem) {
    selectedMediaForDetail.value = media
    mediaDetailModalOpen.value = true
  }
  function closeMediaDetailModal() {
    selectedMediaForDetail.value = null
    mediaDetailModalOpen.value = false
  }

  function openChangePasswordModal() {
    changePasswordModalOpen.value = true
  }
  function closeChangePasswordModal() {
    changePasswordModalOpen.value = false
  }

  function openReportModal() {
    reportModalOpen.value = true
  }
  function closeReportModal() {
    reportModalOpen.value = false
  }

  function openRestoreAccountModal() {
    restoreAccountModalOpen.value = true
  }
  function closeRestoreAccountModal() {
    restoreAccountModalOpen.value = false
  }

  return {
    createPostModalOpen,
    editPostModalOpen,
    approvalModalOpen,
    changePasswordModalOpen,
    restoreAccountModalOpen,
    postDetailModalOpen,
    uploadMediaModalOpen,
    mediaDetailModalOpen,
    reportModalOpen,
    selectedPostForEdit,
    selectedPostForDetail,
    selectedPostForApproval,
    selectedMediaForEdit,
    selectedMediaForDetail,
    currentApprovalAction,
    openCreatePostModal,
    closeCreatePostModal,
    openEditPostModal,
    closeEditPostModal,
    openApprovalModal,
    closeApprovalModal,
    openPostDetailModal,
    closePostDetailModal,
    openUploadMediaModal,
    closeUploadMediaModal,
    openMediaDetailModal,
    closeMediaDetailModal,
    openReportModal,
    closeReportModal,
    openChangePasswordModal,
    closeChangePasswordModal,
    openRestoreAccountModal,
    closeRestoreAccountModal
  }
}
