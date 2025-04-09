<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click.self="$emit('close')"
    >
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
          class="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-6"
        >
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">Create New Trip</h2>
            <button
              class="text-gray-400 hover:text-gray-600"
              @click="$emit('close')"
            >
              <XIcon :size="16" />
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Trip Name</label>
              <input
                v-model="newTrip.name"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Summer Vacation 2024"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                v-model="newTrip.location"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Bali, Indonesia"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  v-model="newTrip.startDate"
                  type="date"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  v-model="newTrip.endDate"
                  type="date"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Budget</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign
                    :size="14"
                    class="text-gray-400"
                  />
                </div>
                <input
                  v-model="newTrip.budget"
                  type="number"
                  class="w-full pl-8 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >People (comma separated)</label
              >
              <input
                v-model="newTrip.people"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., John, Jane, Mike"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Tags (comma separated)</label
              >
              <input
                v-model="newTrip.tags"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., beach, family, adventure"
              />
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              class="px-4 py-2 text-gray-700 hover:text-gray-900"
              @click="$emit('close')"
            >
              Cancel
            </button>
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              @click="createTrip"
            >
              Create Trip
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { DollarSign, XIcon } from 'lucide-vue-next'
import { ref } from 'vue'

interface Trip {
  id: string
  name: string
  location: string
  startDate: string
  endDate: string
  budget: number
  people: string[]
  bookings: {
    flights: Array<{
      id: string
      airline: string
      flightNumber: string
      departure: string
      arrival: string
      date: string
    }>
    hotels: Array<{
      id: string
      name: string
      checkIn: string
      checkOut: string
      address: string
    }>
  }
  tags: string[]
}

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'create', trip: Trip): void
}>()

const newTrip = ref<Partial<Trip>>({
  name: '',
  location: '',
  startDate: '',
  endDate: '',
  budget: 0,
  people: [],
  bookings: {
    flights: [],
    hotels: [],
  },
  tags: [],
})

const createTrip = () => {
  if (
    !newTrip.value.name ||
    !newTrip.value.location ||
    !newTrip.value.startDate ||
    !newTrip.value.endDate
  ) {
    return
  }

  const trip: Trip = {
    id: Date.now().toString(),
    name: newTrip.value.name,
    location: newTrip.value.location,
    startDate: newTrip.value.startDate,
    endDate: newTrip.value.endDate,
    budget: newTrip.value.budget || 0,
    people: newTrip.value.people || [],
    bookings: {
      flights: newTrip.value.bookings?.flights || [],
      hotels: newTrip.value.bookings?.hotels || [],
    },
    tags: newTrip.value.tags || [],
  }

  emit('create', trip)
  resetNewTrip()
}

const resetNewTrip = () => {
  newTrip.value = {
    name: '',
    location: '',
    startDate: '',
    endDate: '',
    budget: 0,
    people: [],
    bookings: {
      flights: [],
      hotels: [],
    },
    tags: [],
  }
}
</script>
