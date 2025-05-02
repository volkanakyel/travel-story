<template>
  <div class="min-h-screen flex md:flex-row flex-col">
    <AppTripCreationModal
      :is-open="isCreateTripModalOpen"
      @close="isCreateTripModalOpen = false"
      @create="createTrip"
    />

    <AppTripDetailsModal
      :trip="selectedTrip"
      @close="selectedTrip = null"
    />

    <AppSidebar
      :is-open="isSidebarOpen"
      :trips="trips"
      @toggle="toggleSidebar"
      @create-trip="isCreateTripModalOpen = true"
      @select-trip="selectTrip"
    />

    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-10 md:hidden"
      @click="toggleSidebar"
    />

    <main class="flex-1 min-h-screen p-8">
      <div class="max-w-full mx-auto px-4 py-6 md:px-6 lg:px-8 bg-gray-50 rounded-2xl p-8">
        <header class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-4">
            <button
              class="md:hidden text-gray-500 hover:text-gray-900"
              @click="toggleSidebar"
            >
              <Menu :size="24" />
            </button>
            <h1 class="text-2xl font-semibold text-gray-900">Account</h1>
          </div>
          <AppNotifications
            :notifications="notifications"
            @mark-as-read="markAsRead"
          />
        </header>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div class="p-6 md:p-8">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div class="flex items-center gap-4">
                <div class="relative group">
                  <div
                    class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur opacity-10 group-hover:opacity-20 transition duration-200"
                  />
                  <img
                    :src="'/uikielle.png'"
                    alt="Profile"
                    class="relative w-16 h-16 rounded-full object-cover ring-2 ring-white"
                  />
                  <div
                    class="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
                  />
                </div>
                <div>
                  <h2 class="text-xl font-semibold text-gray-900">Volkan Akyel</h2>
                  <p class="text-gray-500">@uikielle</p>
                </div>
              </div>
              <button
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group relative"
              >
                <div
                  class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-200"
                />
                <span class="relative">Edit Profile</span>
              </button>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              <div class="group relative">
                <div
                  class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-200"
                />
                <div
                  class="relative bg-gray-50 rounded-xl p-4 text-center hover:bg-white transition-colors"
                >
                  <div class="flex items-center justify-center mb-3">
                    <Plane
                      :size="20"
                      class="text-blue-600"
                    />
                  </div>
                  <div class="font-semibold text-xl text-gray-900">21,301</div>
                  <div class="text-sm text-gray-500 mt-1">Miles</div>
                </div>
              </div>
              <div class="group relative">
                <div
                  class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-200"
                />
                <div
                  class="relative bg-gray-50 rounded-xl p-4 text-center hover:bg-white transition-colors"
                >
                  <div class="flex items-center justify-center mb-3">
                    <Calendar
                      :size="20"
                      class="text-blue-600"
                    />
                  </div>
                  <div class="font-semibold text-xl text-gray-900">81</div>
                  <div class="text-sm text-gray-500 mt-1">Days</div>
                </div>
              </div>
              <div class="group relative">
                <div
                  class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-200"
                />
                <div
                  class="relative bg-gray-50 rounded-xl p-4 text-center hover:bg-white transition-colors"
                >
                  <div class="flex items-center justify-center mb-3">
                    <PlaneTakeoff
                      :size="20"
                      class="text-blue-600"
                    />
                  </div>
                  <div class="font-semibold text-xl text-gray-900">24</div>
                  <div class="text-sm text-gray-500 mt-1">Flights</div>
                </div>
              </div>
              <div class="group relative">
                <div
                  class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-200"
                />
                <div
                  class="relative bg-gray-50 rounded-xl p-4 text-center hover:bg-white transition-colors"
                >
                  <div class="flex items-center justify-center mb-3">
                    <Flag
                      :size="20"
                      class="text-blue-600"
                    />
                  </div>
                  <div class="font-semibold text-xl text-gray-900">11</div>
                  <div class="text-sm text-gray-500 mt-1">Countries</div>
                </div>
              </div>
              <div class="group relative">
                <div
                  class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-200"
                />
                <div
                  class="relative bg-gray-50 rounded-xl p-4 text-center hover:bg-white transition-colors"
                >
                  <div class="flex items-center justify-center mb-3">
                    <Building2
                      :size="20"
                      class="text-blue-600"
                    />
                  </div>
                  <div class="font-semibold text-xl text-gray-900">45</div>
                  <div class="text-sm text-gray-500 mt-1">Hotels</div>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-100 p-6 md:p-8 space-y-6 pb-20">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium text-gray-900">Public Profile</h3>
                <p class="text-sm text-gray-500 mt-1">Allow others to view your profile</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="isPublic"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                />
              </label>
            </div>

            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">Social links</h3>
                  <p class="text-sm text-gray-500">
                    These will be visible on your profile if it's set to public
                  </p>
                </div>
                <button class="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Add Link
                </button>
              </div>

              <div class="space-y-3">
                <div class="group relative">
                  <div
                    class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-200"
                  />
                  <div
                    class="relative flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-white transition-colors"
                  >
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Instagram
                          :size="20"
                          class="text-blue-600"
                        />
                      </div>
                      <div>
                        <span class="text-gray-900 font-medium">Instagram</span>
                        <p class="text-sm text-gray-500">@volkanakielle</p>
                      </div>
                    </div>
                    <button class="text-gray-400 hover:text-gray-600">
                      <XIcon :size="16" />
                    </button>
                  </div>
                </div>
                <div class="group relative">
                  <div
                    class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-200"
                  />
                  <div
                    class="relative flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-white transition-colors"
                  >
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Twitter
                          :size="20"
                          class="text-blue-600"
                        />
                      </div>
                      <div>
                        <span class="text-gray-900 font-medium">X</span>
                        <p class="text-sm text-gray-500">@uikielle</p>
                      </div>
                    </div>
                    <button class="text-gray-400 hover:text-gray-600">
                      <XIcon :size="16" />
                    </button>
                  </div>
                </div>
                <div class="group relative">
                  <div
                    class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-200"
                  />
                  <div
                    class="relative flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-white transition-colors"
                  >
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Send
                          :size="20"
                          class="text-blue-600"
                        />
                      </div>
                      <div>
                        <span class="text-gray-900 font-medium">Telegram</span>
                        <p class="text-sm text-gray-500">@volkanakielle</p>
                      </div>
                    </div>
                    <button class="text-gray-400 hover:text-gray-600">
                      <XIcon :size="16" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group relative"
            >
              <div
                class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-200"
              />
              <span class="relative">Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom navigation for mobile -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div class="flex justify-around px-4 py-3">
        <button class="flex flex-col items-center text-gray-400 hover:text-blue-600">
          <Home :size="24" />
          <span class="text-xs mt-1">Home</span>
        </button>
        <button class="flex flex-col items-center text-gray-400 hover:text-blue-600">
          <MapPin :size="24" />
          <span class="text-xs mt-1">Trips</span>
        </button>
        <button class="flex flex-col items-center text-blue-600">
          <UserCircle :size="24" />
          <span class="text-xs mt-1">Profile</span>
        </button>
        <button class="flex flex-col items-center text-gray-400 hover:text-blue-600">
          <Settings :size="24" />
          <span class="text-xs mt-1">Settings</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import {
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle2,
  Flag,
  Home,
  Info,
  Instagram,
  MapPin,
  Menu,
  Plane,
  PlaneTakeoff,
  Send,
  Settings,
  Twitter,
  UserCircle,
  XIcon,
} from 'lucide-vue-next'
import { onUnmounted, ref, watch } from 'vue'

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

const isPublic = ref(false)
const isSidebarOpen = ref(false)
const isCreateTripModalOpen = ref(false)
const selectedTrip = ref<Trip | null>(null)
const trips = ref<Trip[]>([
  {
    id: '1',
    name: 'Bucharest City',
    location: 'Bucharest, Romania',
    startDate: '2024-05-15',
    endDate: '2024-05-20',
    budget: 1200,
    people: ['Volkan', 'Metehan'],
    bookings: {
      flights: [
        {
          id: '1',
          airline: 'Turkish Airlines',
          flightNumber: 'TK1234',
          departure: 'IST',
          arrival: 'OTP',
          date: '2024-05-15',
        },
      ],
      hotels: [
        {
          id: '1',
          name: 'Grand Hotel Continental',
          checkIn: '2024-05-15',
          checkOut: '2024-05-20',
          address: 'Calea Victoriei 56, Bucharest',
        },
      ],
    },
    tags: ['city', 'culture', 'romania'],
  },
  {
    id: '2',
    name: 'London 2024',
    location: 'London, UK',
    startDate: '2024-07-10',
    endDate: '2024-07-17',
    budget: 2500,
    people: ['Volkan', 'Anton', 'Mike'],
    bookings: {
      flights: [
        {
          id: '1',
          airline: 'British Airways',
          flightNumber: 'BA123',
          departure: 'IST',
          arrival: 'LHR',
          date: '2024-07-10',
        },
      ],
      hotels: [
        {
          id: '1',
          name: 'The Ritz London',
          checkIn: '2024-07-10',
          checkOut: '2024-07-17',
          address: '150 Piccadilly, London',
        },
      ],
    },
    tags: ['uk', 'city', 'summer'],
  },
])

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

const isNotificationsOpen = ref(false)
const notificationsRef = ref<HTMLElement | null>(null)
const notifications = ref([
  {
    id: '1',
    type: 'success' as const,
    title: 'Flight Confirmed',
    message: 'Your flight to London has been confirmed',
    icon: CheckCircle2,
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'warning' as const,
    title: 'Check-in Reminder',
    message: 'Check-in for your flight opens in 24 hours',
    icon: AlertCircle,
    time: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'info' as const,
    title: 'Hotel Update',
    message: 'Your hotel booking has been upgraded',
    icon: Info,
    time: '1 day ago',
    read: true,
  },
  {
    id: '4',
    type: 'success' as const,
    title: 'Trip Created',
    message: 'New trip to Paris has been created',
    icon: CheckCircle2,
    time: '2 days ago',
    read: true,
  },
])

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

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

  trips.value.push(trip)
  isCreateTripModalOpen.value = false
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

const selectTrip = (trip: Trip) => {
  selectedTrip.value = trip
  isSidebarOpen.value = false
}

const markAsRead = (id: string) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (notificationsRef.value && !notificationsRef.value.contains(event.target as Node)) {
    isNotificationsOpen.value = false
  }
}

watch(isNotificationsOpen, isOpen => {
  if (isOpen) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style>
html {
  scroll-behavior: smooth;
}

.overflow-y-auto::-webkit-scrollbar {
  display: none;
}

.overflow-y-auto {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.transition {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.backdrop-blur-sm {
  transition: backdrop-filter 0.2s ease;
}

.translate-y-1 {
  transform: translateY(0.25rem);
}

.translate-y-0 {
  transform: translateY(0);
}
</style>
