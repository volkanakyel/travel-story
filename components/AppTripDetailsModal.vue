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
          class="bg-white rounded-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          <div class="p-6 border-b border-gray-100">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-900">{{ trip.name }}</h2>
              <button
                class="text-gray-400 hover:text-gray-600"
                @click="$emit('close')"
              >
                <XIcon :size="16" />
              </button>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto p-6 space-y-6">
            <div class="space-y-6">
              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center gap-2">
                  <MapPin
                    :size="16"
                    class="text-gray-400"
                  />
                  <span class="text-gray-700">{{ trip.location }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Calendar
                    :size="16"
                    class="text-gray-400"
                  />
                  <span class="text-gray-700">{{ trip.startDate }} - {{ trip.endDate }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <DollarSign
                    :size="16"
                    class="text-gray-400"
                  />
                  <span class="text-gray-700">${{ trip.budget }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Users
                    :size="16"
                    class="text-gray-400"
                  />
                  <span class="text-gray-700">{{ trip.people.join(', ') }}</span>
                </div>
              </div>

              <div v-if="trip.bookings.flights.length > 0">
                <h3 class="text-lg font-medium text-gray-900 mb-3">Flights</h3>
                <div class="space-y-3">
                  <div
                    v-for="flight in trip.bookings.flights"
                    :key="flight.id"
                    class="bg-gray-50 p-4 rounded-lg"
                  >
                    <div class="flex items-center justify-between">
                      <div>
                        <div class="font-medium">
                          {{ flight.airline }} - {{ flight.flightNumber }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ flight.departure }} → {{ flight.arrival }}
                        </div>
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
                    class="bg-gray-50 p-4 rounded-lg"
                  >
                    <div class="font-medium">{{ hotel.name }}</div>
                    <div class="text-sm text-gray-500">{{ hotel.address }}</div>
                    <div class="text-sm text-gray-500 mt-1">
                      Check-in: {{ hotel.checkIn }} - Check-out: {{ hotel.checkOut }}
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="trip.tags.length > 0">
                <h3 class="text-lg font-medium text-gray-900 mb-3">Tags</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in trip.tags"
                    :key="tag"
                    class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <div class="border-t border-gray-100 pt-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Share Trip</h3>
                <div class="flex flex-col items-center gap-4">
                  <div class="bg-gray-50 p-4 rounded-lg">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Calendar, DollarSign, MapPin, Users, XIcon } from 'lucide-vue-next'

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
  trip: Trip | null
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>
