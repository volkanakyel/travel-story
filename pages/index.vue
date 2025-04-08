<template>
  <div class="min-h-screen bg-gray-50 flex md:flex-row flex-col">
    <!-- Create Trip Modal -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isCreateTripModalOpen"
        class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        @click.self="isCreateTripModalOpen = false"
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
            v-if="isCreateTripModalOpen"
            class="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-6"
          >
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-900">Create New Trip</h2>
              <button
                class="text-gray-400 hover:text-gray-600"
                @click="isCreateTripModalOpen = false"
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
                @click="isCreateTripModalOpen = false"
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

    <!-- Trip Details Modal -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="selectedTrip"
        class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        @click.self="selectedTrip = null"
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
            v-if="selectedTrip"
            class="bg-white rounded-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div class="p-6 border-b border-gray-100">
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold text-gray-900">{{ selectedTrip.name }}</h2>
                <button
                  class="text-gray-400 hover:text-gray-600"
                  @click="selectedTrip = null"
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
                    <span class="text-gray-700">{{ selectedTrip.location }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Calendar
                      :size="16"
                      class="text-gray-400"
                    />
                    <span class="text-gray-700"
                      >{{ selectedTrip.startDate }} - {{ selectedTrip.endDate }}</span
                    >
                  </div>
                  <div class="flex items-center gap-2">
                    <DollarSign
                      :size="16"
                      class="text-gray-400"
                    />
                    <span class="text-gray-700">${{ selectedTrip.budget }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Users
                      :size="16"
                      class="text-gray-400"
                    />
                    <span class="text-gray-700">{{ selectedTrip.people.join(', ') }}</span>
                  </div>
                </div>

                <div v-if="selectedTrip.bookings.flights.length > 0">
                  <h3 class="text-lg font-medium text-gray-900 mb-3">Flights</h3>
                  <div class="space-y-3">
                    <div
                      v-for="flight in selectedTrip.bookings.flights"
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

                <div v-if="selectedTrip.bookings.hotels.length > 0">
                  <h3 class="text-lg font-medium text-gray-900 mb-3">Hotels</h3>
                  <div class="space-y-3">
                    <div
                      v-for="hotel in selectedTrip.bookings.hotels"
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

                <div v-if="selectedTrip.tags.length > 0">
                  <h3 class="text-lg font-medium text-gray-900 mb-3">Tags</h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in selectedTrip.tags"
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
                          JSON.stringify(selectedTrip),
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

    <!-- Sidebar for desktop -->
    <aside
      class="fixed md:static inset-y-0 left-0 z-20 flex flex-col w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out"
      :class="{
        'translate-x-0': isSidebarOpen,
        '-translate-x-full md:translate-x-0': !isSidebarOpen,
      }"
    >
      <div class="flex items-center justify-between p-6">
        <div class="flex items-center">
          <div class="w-2 h-2 bg-blue-600 rounded-full mr-2" />
          <span class="font-semibold text-gray-900">TravelWith</span>
        </div>
        <button
          class="text-gray-400 hover:text-gray-600 md:hidden"
          @click="toggleSidebar"
        >
          <XIcon size="20" />
        </button>
      </div>

      <nav class="flex-1 px-6 pb-6 overflow-y-auto">
        <div class="space-y-1">
          <button class="flex items-center w-full px-4 py-2.5 text-blue-600 bg-blue-50 rounded-lg">
            <UserCircle
              size="20"
              class="mr-3 flex-shrink-0"
            />
            <span class="truncate">Volkan Uikielle</span>
            <ChevronRight
              size="16"
              class="ml-auto flex-shrink-0"
            />
          </button>
        </div>

        <div class="mt-8">
          <button
            class="flex items-center w-full px-4 py-2.5 text-blue-600 font-medium rounded-lg hover:bg-blue-50"
            @click="isCreateTripModalOpen = true"
          >
            <PlusCircle
              size="20"
              class="mr-3 flex-shrink-0"
            />
            <span>Create trip</span>
          </button>
        </div>

        <div class="mt-6">
          <div class="flex items-center px-4 py-2.5">
            <MapPin
              size="20"
              class="mr-3 text-gray-400 flex-shrink-0"
            />
            <span class="text-gray-900 font-medium">Trips</span>
            <ChevronDown
              size="16"
              class="ml-auto text-gray-400 flex-shrink-0"
            />
          </div>
          <div class="ml-9 mt-2 space-y-1">
            <a
              v-for="trip in trips"
              :key="trip.id"
              href="#"
              class="block px-4 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50"
              @click.prevent="selectTrip(trip)"
            >
              {{ trip.name }}
            </a>
          </div>
        </div>

        <div class="mt-6 space-y-1">
          <button
            class="flex items-center w-full px-4 py-2.5 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50"
          >
            <CreditCard
              size="20"
              class="mr-3 text-gray-400 flex-shrink-0"
            />
            <span>Subscription</span>
          </button>
          <button
            class="flex items-center w-full px-4 py-2.5 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50"
          >
            <LifeBuoy
              size="20"
              class="mr-3 text-gray-400 flex-shrink-0"
            />
            <span>Support</span>
          </button>
          <button
            class="flex items-center w-full px-4 py-2.5 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50"
          >
            <Smartphone
              size="20"
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

    <!-- Overlay for mobile -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-10 md:hidden"
      @click="toggleSidebar"
    />

    <!-- Main content -->
    <main class="flex-1 min-h-screen">
      <div class="max-w-4xl mx-auto px-4 py-6 md:px-6 lg:px-8">
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
                v-if="isNotificationsOpen"
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
                  <button class="text-sm text-blue-600 hover:text-blue-700">
                    View all notifications
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </header>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div class="p-6 md:p-8">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div class="flex items-center gap-4">
                <div class="relative">
                  <img
                    :src="'/uikielle.png'"
                    alt="Profile"
                    class="w-16 h-16 rounded-full object-cover ring-2 ring-white"
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
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              <div class="bg-gray-50 rounded-xl p-4 text-center">
                <div class="flex items-center justify-center mb-3">
                  <Plane
                    size="20"
                    class="text-gray-400"
                  />
                </div>
                <div class="font-semibold text-xl text-gray-900">21,301</div>
                <div class="text-sm text-gray-500 mt-1">Miles</div>
              </div>
              <div class="bg-gray-50 rounded-xl p-4 text-center">
                <div class="flex items-center justify-center mb-3">
                  <Calendar
                    size="20"
                    class="text-gray-400"
                  />
                </div>
                <div class="font-semibold text-xl text-gray-900">81</div>
                <div class="text-sm text-gray-500 mt-1">Days</div>
              </div>
              <div class="bg-gray-50 rounded-xl p-4 text-center">
                <div class="flex items-center justify-center mb-3">
                  <PlaneTakeoff
                    size="20"
                    class="text-gray-400"
                  />
                </div>
                <div class="font-semibold text-xl text-gray-900">24</div>
                <div class="text-sm text-gray-500 mt-1">Flights</div>
              </div>
              <div class="bg-gray-50 rounded-xl p-4 text-center">
                <div class="flex items-center justify-center mb-3">
                  <Flag
                    size="20"
                    class="text-gray-400"
                  />
                </div>
                <div class="font-semibold text-xl text-gray-900">11</div>
                <div class="text-sm text-gray-500 mt-1">Countries</div>
              </div>
              <div class="bg-gray-50 rounded-xl p-4 text-center">
                <div class="flex items-center justify-center mb-3">
                  <Building2
                    size="20"
                    class="text-gray-400"
                  />
                </div>
                <div class="font-semibold text-xl text-gray-900">45</div>
                <div class="text-sm text-gray-500 mt-1">Hotels</div>
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
              <h3 class="font-medium text-gray-900">Social links</h3>
              <p class="text-sm text-gray-500">
                These will be visible on your profile if it's set to public
              </p>

              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div class="flex items-center gap-3">
                    <Instagram
                      size="20"
                      class="text-gray-400"
                    />
                    <span class="text-gray-700">Instagram</span>
                  </div>
                  <span class="text-gray-500">@volkanakielle</span>
                </div>
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div class="flex items-center gap-3">
                    <Twitter
                      size="20"
                      class="text-gray-400"
                    />
                    <span class="text-gray-700">X</span>
                  </div>
                  <span class="text-gray-500">@uikielle</span>
                </div>
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div class="flex items-center gap-3">
                    <Send
                      size="20"
                      class="text-gray-400"
                    />
                    <span class="text-gray-700">Telegram</span>
                  </div>
                  <span class="text-gray-500">@volkanakielle</span>
                </div>
              </div>
            </div>

            <button
              class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom navigation for mobile -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div class="flex justify-around px-4 py-3">
        <button class="flex flex-col items-center text-gray-400 hover:text-blue-600">
          <Home size="24" />
          <span class="text-xs mt-1">Home</span>
        </button>
        <button class="flex flex-col items-center text-gray-400 hover:text-blue-600">
          <MapPin size="24" />
          <span class="text-xs mt-1">Trips</span>
        </button>
        <button class="flex flex-col items-center text-blue-600">
          <UserCircle size="24" />
          <span class="text-xs mt-1">Profile</span>
        </button>
        <button class="flex flex-col items-center text-gray-400 hover:text-blue-600">
          <Settings size="24" />
          <span class="text-xs mt-1">Settings</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import {
  AlertCircle,
  BellIcon,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CreditCard,
  DollarSign,
  Flag,
  Home,
  Info,
  Instagram,
  LifeBuoy,
  MapPin,
  Menu,
  Plane,
  PlaneTakeoff,
  PlusCircle,
  Send,
  Settings,
  Smartphone,
  Twitter,
  UserCircle,
  Users,
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
    people: ['Volkan', 'Jane'],
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
    type: 'success',
    title: 'Flight Confirmed',
    message: 'Your flight to London has been confirmed',
    icon: CheckCircle2,
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Check-in Reminder',
    message: 'Check-in for your flight opens in 24 hours',
    icon: AlertCircle,
    time: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Hotel Update',
    message: 'Your hotel booking has been upgraded',
    icon: Info,
    time: '1 day ago',
    read: true,
  },
  {
    id: '4',
    type: 'success',
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

const shareTrip = () => {
  if (navigator.share) {
    navigator.share({
      title: selectedTrip.value?.name,
      text: `Check out my trip to ${selectedTrip.value?.location} from ${selectedTrip.value?.startDate} to ${selectedTrip.value?.endDate}`,
      url: window.location.href,
    })
  } else {
    // Fallback for browsers that don't support the Web Share API
    const text = `Check out my trip to ${selectedTrip.value?.location} from ${selectedTrip.value?.startDate} to ${selectedTrip.value?.endDate}`
    navigator.clipboard.writeText(text)
    alert('Trip details copied to clipboard!')
  }
}

const toggleNotifications = () => {
  isNotificationsOpen.value = !isNotificationsOpen.value
}

const markAsRead = (id: string) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
  }
}

// Add click outside handler
const handleClickOutside = (event: MouseEvent) => {
  if (notificationsRef.value && !notificationsRef.value.contains(event.target as Node)) {
    isNotificationsOpen.value = false
  }
}

// Add and remove event listener when dropdown opens/closes
watch(isNotificationsOpen, isOpen => {
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

<style>
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.overflow-y-auto::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.overflow-y-auto {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Add smooth transitions for all components */
.transition {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Add backdrop blur transition */
.backdrop-blur-sm {
  transition: backdrop-filter 0.2s ease;
}

/* Add transform transition */
.translate-y-1 {
  transform: translateY(0.25rem);
}

.translate-y-0 {
  transform: translateY(0);
}
</style>
