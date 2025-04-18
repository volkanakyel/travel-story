<template>
  <aside
    class="fixed md:static inset-y-0 left-0 z-20 flex flex-col w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out"
    :class="{
      'translate-x-0': isOpen,
      '-translate-x-full md:translate-x-0': !isOpen,
    }"
  >
    <div class="flex items-center justify-between p-6">
      <div class="flex items-center">
        <div class="w-2 h-2 bg-blue-600 rounded-full mr-2" />
        <span class="font-semibold text-gray-900">TravelWith</span>
      </div>
      <button
        class="text-gray-400 hover:text-gray-600 md:hidden"
        @click="$emit('toggle')"
      >
        <XIcon :size="20" />
      </button>
    </div>

    <nav class="flex-1 px-6 pb-6 overflow-y-auto">
      <div class="space-y-1">
        <button class="flex items-center w-full px-4 py-2.5 text-blue-600 bg-blue-50 rounded-lg">
          <UserCircle
            :size="20"
            class="mr-3 flex-shrink-0"
          />
          <span class="truncate">Volkan Uikielle</span>
          <ChevronRight
            :size="16"
            class="ml-auto flex-shrink-0"
          />
        </button>
      </div>

      <div class="mt-8">
        <button
          class="flex items-center w-full px-4 py-2.5 text-blue-600 font-medium rounded-lg hover:bg-blue-50"
          @click="$emit('create-trip')"
        >
          <PlusCircle
            :size="20"
            class="mr-3 flex-shrink-0"
          />
          <span>Create trip</span>
        </button>
      </div>

      <div class="mt-6">
        <button
          class="flex items-center w-full px-4 py-2.5"
          @click="isTripsOpen = !isTripsOpen"
        >
          <MapPin
            :size="20"
            class="mr-3 text-gray-400 flex-shrink-0"
          />
          <span class="text-gray-900 font-medium">Trips</span>
          <ChevronDown
            :size="16"
            class="ml-auto text-gray-400 flex-shrink-0 transition-transform duration-200"
            :class="{ 'rotate-180': isTripsOpen }"
          />
        </button>
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-1"
        >
          <div
            v-if="isTripsOpen"
            class="ml-9 mt-2 space-y-1"
          >
            <a
              v-for="trip in trips"
              :key="trip.id"
              href="#"
              class="block px-4 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50"
              @click.prevent="$emit('select-trip', trip)"
            >
              {{ trip.name }}
            </a>
          </div>
        </Transition>
      </div>

      <div class="mt-6 space-y-1">
        <button
          class="flex items-center w-full px-4 py-2.5 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50"
        >
          <CreditCard
            :size="20"
            class="mr-3 text-gray-400 flex-shrink-0"
          />
          <span>Subscription</span>
        </button>
        <button
          class="flex items-center w-full px-4 py-2.5 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50"
        >
          <LifeBuoy
            :size="20"
            class="mr-3 text-gray-400 flex-shrink-0"
          />
          <span>Support</span>
        </button>
        <button
          class="flex items-center w-full px-4 py-2.5 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50"
        >
          <Smartphone
            :size="20"
            class="mr-3 text-gray-400 flex-shrink-0"
          />
          <span>Mobile App</span>
        </button>
      </div>
    </nav>

    <div class="px-6 pb-6 border-t border-gray-100 pt-6 mt-auto">
      <div class="bg-gray-50 rounded-xl p-4 mb-4">
        <div class="flex items-center justify-between mb-1">
          <span class="text-sm font-medium">Current Plan</span>
          <span class="text-xs text-gray-500 px-2 py-1 bg-gray-200 rounded-full">FREE</span>
        </div>
        <p class="text-xs text-gray-500">Only basic features</p>
      </div>
      <div class="text-xs text-gray-500 space-y-2">
        <a
          href="#"
          class="block hover:text-gray-900"
          >Terms of use</a
        >
        <a
          href="#"
          class="block hover:text-gray-900"
          >Privacy Policy</a
        >
        <p class="pt-2 border-t border-gray-100">© Copyright 2024.</p>
        <p>All Rights Reserved by TravelWith</p>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {
  ChevronDown,
  ChevronRight,
  CreditCard,
  LifeBuoy,
  MapPin,
  PlusCircle,
  Smartphone,
  UserCircle,
  XIcon,
} from 'lucide-vue-next'

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
  isOpen: boolean
  trips: Trip[]
}>()

const emit = defineEmits<{
  (e: 'toggle' | 'create-trip'): void
  (e: 'select-trip', trip: Trip): void
}>()

const isTripsOpen = ref(true)
</script>
