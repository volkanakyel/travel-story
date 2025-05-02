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
      v-if="trip"
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
          v-if="trip"
          class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          <div class="p-6 border-b border-gray-100">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-900">{{ trip.name }}</h2>
              <button
                class="text-gray-400 hover:text-gray-600 transition-colors"
                @click="$emit('close')"
              >
                <XIcon :size="16" />
              </button>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto p-6 space-y-8">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <Calendar
                    :size="20"
                    class="text-blue-600"
                  />
                  <span class="text-gray-900 font-medium">{{
                    formatDateRange(trip.startDate, trip.endDate)
                  }}</span>
                </div>
                <div class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {{ getTripStatus(trip.startDate, trip.endDate) }}
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <MapPin
                  :size="20"
                  class="text-gray-400"
                />
                <span class="text-gray-700">{{ trip.location }}</span>
              </div>
              <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <DollarSign
                  :size="20"
                  class="text-gray-400"
                />
                <span class="text-gray-700">${{ trip.budget.toLocaleString() }}</span>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-3">Travelers</h3>
              <div class="flex flex-wrap gap-3">
                <div
                  v-for="person in trip.people"
                  :key="person"
                  class="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg"
                >
                  <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-blue-600 font-medium text-sm">{{ getInitials(person) }}</span>
                  </div>
                  <span class="text-gray-700">{{ person }}</span>
                </div>
              </div>
            </div>

            <div v-if="trip.bookings.flights.length > 0">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Flights</h3>
              <div class="space-y-3">
                <div
                  v-for="flight in trip.bookings.flights"
                  :key="flight.id"
                  class="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
                >
                  <div class="flex items-center gap-3 mb-2">
                    <PlaneTakeoff
                      :size="20"
                      class="text-blue-600"
                    />
                    <div class="font-medium text-gray-900">{{ flight.airline }}</div>
                    <div class="text-sm text-gray-500">#{{ flight.flightNumber }}</div>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="space-y-1">
                      <div class="text-sm font-medium text-gray-900">
                        {{ flight.departure }} → {{ flight.arrival }}
                      </div>
                      <div class="text-xs text-gray-500">{{ formatDate(flight.date) }}</div>
                    </div>
                    <div class="text-sm text-gray-500">{{ flight.date }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="trip.bookings.hotels.length > 0">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Hotels</h3>
              <div class="space-y-3">
                <div
                  v-for="hotel in trip.bookings.hotels"
                  :key="hotel.id"
                  class="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
                >
                  <div class="flex items-center gap-3 mb-2">
                    <Building2
                      :size="20"
                      class="text-blue-600"
                    />
                    <div class="font-medium text-gray-900">{{ hotel.name }}</div>
                  </div>
                  <div class="space-y-1">
                    <div class="text-sm text-gray-500">{{ hotel.address }}</div>
                    <div class="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar :size="14" />
                      <span>Check-in: {{ formatDate(hotel.checkIn) }}</span>
                      <span>→</span>
                      <span>Check-out: {{ formatDate(hotel.checkOut) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="trip.tags.length > 0">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Tags</h3>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="tag in trip.tags"
                  :key="tag"
                  class="group relative"
                >
                  <div
                    class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-200"
                  />
                  <span
                    class="relative px-3 py-1.5 bg-white text-blue-600 rounded-lg text-sm font-medium border border-blue-100 group-hover:border-blue-200 transition-colors duration-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-100 pt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Share Trip</h3>
              <div class="flex flex-col items-center gap-4">
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                  <img
                    :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                      JSON.stringify(trip),
                    )}`"
                    alt="Trip QR Code"
                    class="w-32 h-32"
                  />
                </div>
                <p class="text-sm text-gray-500 text-center">
                  Scan this QR code to share trip details with others
                </p>
                <button
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  @click="shareTrip"
                >
                  Share Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Building2, Calendar, DollarSign, MapPin, PlaneTakeoff, XIcon } from 'lucide-vue-next'

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

const props = defineProps<{
  trip: Trip | null
}>()

defineEmits<{
  (e: 'close'): void
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  return `${start.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
}

const getTripStatus = (startDate: string, endDate: string) => {
  const now = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)
  const daysUntilStart = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  const daysUntilEnd = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (now < start) {
    return `Starts in ${daysUntilStart} days`
  } else if (now > end) {
    return `Ended ${Math.abs(daysUntilEnd)} days ago`
  } else {
    return `In progress (${daysUntilEnd} days left)`
  }
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
}

const shareTrip = () => {
  if (navigator.share) {
    navigator.share({
      title: props.trip?.name,
      text: `Check out my trip to ${props.trip?.location} from ${props.trip?.startDate} to ${props.trip?.endDate}`,
      url: window.location.href,
    })
  } else {
    // Fallback for browsers that don't support the Web Share API
    const text = `Check out my trip to ${props.trip?.location} from ${props.trip?.startDate} to ${props.trip?.endDate}`
    navigator.clipboard.writeText(text)
    alert('Trip details copied to clipboard!')
  }
}
</script>
