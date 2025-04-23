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
          class="bg-white rounded-2xl max-w-2xl w-full overflow-hidden"
        >
          <div class="p-6 border-b border-gray-100">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-900">Create New Trip</h2>
              <button
                class="text-gray-400 hover:text-gray-600 transition-colors"
                @click="$emit('close')"
              >
                <XIcon :size="16" />
              </button>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto p-6 space-y-6">
            <!-- Trip Name and Location -->
            <div class="grid grid-cols-2 gap-4">
              <div class="group relative">
                <div class="relative">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Trip Name</label>
                  <input
                    v-model="newTrip.name"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-colors"
                    placeholder="e.g., Summer Vacation 2024"
                  />
                </div>
              </div>
              <div class="group relative">
                <div class="relative">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    v-model="newTrip.location"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-colors"
                    placeholder="e.g., Bali, Indonesia"
                  />
                </div>
              </div>
            </div>

            <!-- Dates -->
            <div class="grid grid-cols-2 gap-4">
              <div class="group relative">
                <div class="relative">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    v-model="newTrip.startDate"
                    type="date"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-colors"
                  />
                </div>
              </div>
              <div class="group relative">
                <div class="relative">
                  <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    v-model="newTrip.endDate"
                    type="date"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-colors"
                  />
                </div>
              </div>
            </div>

            <!-- Budget Section -->
            <div class="group relative">
              <div class="relative bg-gray-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-sm font-medium text-gray-700">Budget</label>
                  <div class="flex items-center gap-2">
                    <button
                      v-for="currency in ['USD', 'EUR', 'GBP']"
                      :key="currency"
                      class="px-2 py-1 text-xs font-medium rounded-lg transition-colors"
                      :class="{
                        'bg-blue-600 text-white': selectedCurrency === currency,
                        'text-gray-500 hover:text-gray-700': selectedCurrency !== currency,
                      }"
                      @click="selectedCurrency = currency"
                    >
                      {{ currency }}
                    </button>
                  </div>
                </div>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-400 font-medium">
                      {{
                        selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : '£'
                      }}
                    </span>
                  </div>
                  <input
                    v-model="newTrip.budget"
                    type="number"
                    class="w-full pl-8 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-colors"
                    placeholder="0"
                  />
                </div>
                <div class="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <div class="flex items-center gap-1">
                    <div class="w-2 h-2 rounded-full bg-green-500" />
                    <span
                      >Low:
                      {{
                        selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : '£'
                      }}500</span
                    >
                  </div>
                  <div class="flex items-center gap-1">
                    <div class="w-2 h-2 rounded-full bg-yellow-500" />
                    <span
                      >Medium:
                      {{
                        selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : '£'
                      }}1,500</span
                    >
                  </div>
                  <div class="flex items-center gap-1">
                    <div class="w-2 h-2 rounded-full bg-red-500" />
                    <span
                      >High:
                      {{
                        selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : '£'
                      }}3,000+</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- People -->
            <div class="group relative">
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">People</label>
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="(person, index) in peopleList"
                    :key="index"
                    class="flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm"
                  >
                    <span>{{ person }}</span>
                    <button
                      class="text-gray-400 hover:text-gray-600"
                      @click="removePerson(index)"
                    >
                      <XIcon :size="14" />
                    </button>
                  </div>
                  <input
                    v-model="currentPerson"
                    type="text"
                    class="flex-1 min-w-[120px] px-3 py-1 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-colors"
                    placeholder="Add person..."
                    @keydown.enter="addPerson"
                  />
                </div>
              </div>
            </div>

            <!-- Tags -->
            <div class="group relative">
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="(tag, index) in tagsList"
                    :key="index"
                    class="flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm"
                  >
                    <span>{{ tag }}</span>
                    <button
                      class="text-gray-400 hover:text-gray-600"
                      @click="removeTag(index)"
                    >
                      <XIcon :size="14" />
                    </button>
                  </div>
                  <input
                    v-model="currentTag"
                    type="text"
                    class="flex-1 min-w-[120px] px-3 py-1 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-colors"
                    placeholder="Add tag..."
                    @keydown.enter="addTag"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="p-6 border-t border-gray-100">
            <div class="flex justify-end space-x-3">
              <button
                class="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                @click="$emit('close')"
              >
                Cancel
              </button>
              <button
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                @click="createTrip"
              >
                Create Trip
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { XIcon } from 'lucide-vue-next'
import { ref, watch } from 'vue'

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

const selectedCurrency = ref('USD')
const currentPerson = ref('')
const currentTag = ref('')
const peopleList = ref<string[]>([])
const tagsList = ref<string[]>([])

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

const addPerson = () => {
  if (currentPerson.value.trim()) {
    peopleList.value.push(currentPerson.value.trim())
    currentPerson.value = ''
  }
}

const removePerson = (index: number) => {
  peopleList.value.splice(index, 1)
}

const addTag = () => {
  if (currentTag.value.trim()) {
    tagsList.value.push(currentTag.value.trim())
    currentTag.value = ''
  }
}

const removeTag = (index: number) => {
  tagsList.value.splice(index, 1)
}

watch(
  peopleList,
  newValue => {
    newTrip.value.people = newValue
  },
  { deep: true },
)

watch(
  tagsList,
  newValue => {
    newTrip.value.tags = newValue
  },
  { deep: true },
)

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
  peopleList.value = []
  tagsList.value = []
  currentPerson.value = ''
  currentTag.value = ''
}
</script>
