<template>
  <div class="relative">
    <button
      class="text-gray-400 hover:text-gray-600 relative"
      @click.stop="toggleNotifications"
    >
      <BellIcon :size="20" />
      <span
        v-if="notifications.some(n => !n.read)"
        class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
      />
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="isOpen"
        ref="notificationsRef"
        class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50"
        @click.stop
      >
        <div class="p-4 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <h3 class="font-medium text-gray-900">Notifications</h3>
            <span class="text-sm text-gray-500"
              >{{ notifications.filter(n => !n.read).length }} new</span
            >
          </div>
        </div>

        <div class="max-h-96 overflow-y-auto">
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            :class="{ 'bg-blue-50': !notification.read }"
            @click="markAsRead(notification.id)"
          >
            <div class="flex items-start gap-3">
              <component
                :is="notification.icon"
                :size="20"
                :class="{
                  'text-green-500': notification.type === 'success',
                  'text-yellow-500': notification.type === 'warning',
                  'text-blue-500': notification.type === 'info',
                }"
              />
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h4 class="font-medium text-gray-900">{{ notification.title }}</h4>
                  <span class="text-xs text-gray-500">{{ notification.time }}</span>
                </div>
                <p class="text-sm text-gray-600 mt-1">{{ notification.message }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 border-t border-gray-100">
          <button class="text-sm text-blue-600 hover:text-blue-700">View all notifications</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { BellIcon } from 'lucide-vue-next'
import { onUnmounted, ref, watch } from 'vue'
import type { Component } from 'vue'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'info'
  title: string
  message: string
  icon: Component
  time: string
  read: boolean
}

defineProps<{
  notifications: Notification[]
}>()

const emit = defineEmits<{
  (e: 'mark-as-read', id: string): void
}>()

const isOpen = ref(false)
const notificationsRef = ref<HTMLElement | null>(null)

const toggleNotifications = () => {
  isOpen.value = !isOpen.value
}

const markAsRead = (id: string) => {
  emit('mark-as-read', id)
}

// Add click outside handler
const handleClickOutside = (event: MouseEvent) => {
  if (notificationsRef.value && !notificationsRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

// Add and remove event listener when dropdown opens/closes
watch(isOpen, isOpen => {
  if (isOpen) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

// Clean up event listener when component is unmounted
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
