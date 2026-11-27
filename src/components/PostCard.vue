<template>
  <article
    class="bg-surface-50 dark:bg-surface-800/85 rounded-2xl border border-surface-200 dark:border-surface-700/80 overflow-hidden flex flex-col shadow-xs dark:shadow-card-dark hover:border-brand-300 dark:hover:border-brand-500/40 hover:shadow-card-hover transition cursor-pointer"
    @click="emit('open', post)"
  >
    <!-- Quem está ligado ao post (cliente, ou redator no painel do cliente) -->
    <div v-if="shownPerson !== undefined" class="px-3.5 py-2.5 border-b border-surface-200/80 dark:border-surface-700/80">
      <UserChip
        :user="shownPerson"
        :label="person === 'writer' ? 'Redator' : 'Cliente'"
        :empty-text="personEmptyText"
        size="sm"
      />
    </div>

    <!-- Primeira mídia do post -->
    <div class="relative aspect-square bg-surface-200/70 dark:bg-surface-900 overflow-hidden">
      <MediaImage
        v-if="coverMedia"
        :media-id="coverMedia.id"
        :alt="coverMedia.alias"
        :video="coverMedia.media_type === 'video'"
      />
      <div v-else class="w-full h-full flex flex-col items-center justify-center text-surface-400 dark:text-surface-500">
        <ImageOff class="w-10 h-10 mb-1" />
        <span class="text-xs">Sem mídia</span>
      </div>

      <span
        v-if="post.medias.length > 1"
        class="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-950/70 text-surface-50 text-[11px] font-semibold"
        :title="`${post.medias.length} mídias`"
      >
        <Layers class="w-3 h-3" />{{ post.medias.length }}
      </span>
    </div>

    <div class="p-4 flex-1 flex flex-col gap-2">
      <div class="flex items-start justify-between gap-2">
        <h4 class="font-semibold text-sm text-surface-900 dark:text-surface-100 line-clamp-1" :title="post.title">{{ post.title }}</h4>
        <StatusBadge :status="post.status" class="shrink-0" />
      </div>
      <p class="text-xs text-surface-600 dark:text-surface-300 line-clamp-3 whitespace-pre-line">{{ post.content }}</p>
      <p
        v-if="post.comments.length > 0"
        class="inline-flex items-center gap-1 text-[11px] text-surface-500 dark:text-surface-400"
        :title="`${post.comments.length} comentário(s)`"
      >
        <MessageCircle class="w-3.5 h-3.5" />{{ post.comments.length }} {{ post.comments.length === 1 ? 'comentário' : 'comentários' }}
      </p>

      <div v-if="$slots.actions" class="mt-auto pt-3 border-t border-surface-200/80 dark:border-surface-700/80 flex items-center gap-2" @click.stop>
        <slot name="actions" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import StatusBadge from './StatusBadge.vue'
import MediaImage from './MediaImage.vue'
import UserChip from './UserChip.vue'
import type { PostItem } from '@/types/api'
import { ImageOff, Layers, MessageCircle } from '@lucide/vue'

const props = withDefaults(defineProps<{
  post: PostItem
  // Pessoa exibida no topo do card
  person?: 'client' | 'writer'
}>(), { person: 'client' })
const emit = defineEmits<{ open: [post: PostItem] }>()

// undefined = API ainda sem o campo (não afirmar "Sem cliente"); null = realmente sem pessoa
const shownPerson = computed(() => props.person === 'writer' ? props.post.writer : props.post.client)

// Post publicado guarda o nome de quem era o cliente/redator, mesmo após desvínculo
const personEmptyText = computed(() => {
  const recorded = props.person === 'writer' ? props.post.published_writer_name : props.post.published_client_name
  if (recorded) return `${recorded} (não vinculado)`
  return props.person === 'writer' ? 'Sem redator' : 'Sem cliente'
})

const coverMedia = computed(() => {
  if (props.post.medias.length === 0) return null
  return [...props.post.medias].sort((a, b) => a.position - b.position)[0].media
})
</script>
