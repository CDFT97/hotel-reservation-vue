<template>
  <div>
    <button
      @click="openModal"
      type="button"
      class="invisible py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      data-hs-overlay="#hs-basic-modal"
    >
      Open modal
    </button>
    
    <div
      v-if="showModal"
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-2/3"
          >
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28"
                    width="28"
                    fill="#fff"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                    />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    class="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Información de la reserva
                  </h3>
                  <div class="mt-4">
                    <div class="mb-0">
                      <span class="mx-3">
                        <strong class="mr-1">Id de la reserva:</strong>
                        <span class="text-gray-700">{{ booking.id }}</span>
                      </span>
                      <span class="mx-3">
                        <strong class="mr-1">Fecha de llegada:</strong>
                        <span class="text-gray-700">{{ booking.arrival_date }}</span>
                      </span>
                      <span class="mx-3">
                        <strong class="mr-1">Fecha salida:</strong>
                        <span class="text-gray-700">{{ booking.departure_date }}</span>
                      </span>
                      <span class="mx-3">
                        <strong class="mr-1">Nº de noches:</strong>
                        <span class="text-gray-700">{{ booking.nights_number }}</span>
                      </span>

                      <hr class="my-4" />

                      <span class="mx-3">
                        <strong class="mr-1">Valor:</strong>
                        <span class="text-gray-700">$ {{ booking.amount }}</span>
                      </span>
                      <span class="mx-3">
                        <strong class="mr-1">Estado:</strong>
                        <span class="text-gray-700 capitalize">{{ booking.status }}</span>
                      </span>
                      <span class="mx-3">
                        <strong class="mr-1">Huesped Principal:</strong>
                        <span class="text-gray-700 capitalize">{{ booking.client.name }}</span>
                      </span>
                      <span class="mx-3">
                        <strong class="mr-1">Doc. de huesped principal:</strong>
                        <span class="text-gray-700 capitalize">{{ booking.client.dni }}</span>
                      </span>
                      <hr class="my-4" />
                      <h3 class="text-center font-semibold text-lg my-2">
                        Información de los otros huespedes
                      </h3>
                      <span class="mx-3">
                        <strong class="mr-1">Cantidad de huespedes (incluyendo al cliente principal):</strong>
                        <span class="text-gray-700 capitalize">{{ booking.guests.total_guests }}</span>
                      </span>

                      <table class="table-auto w-full mt-4">
                        <thead>
                          <tr>
                            <th>Nombre</th>
                            <th>Documento</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="guest in booking.guests.guests_information" :key="guest.name">
                            <td>{{ guest.name }}</td>
                            <td>{{ guest.dni }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
            >
              <button
                @click="closeModal"
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "booking-details-modal",
  components: {},
  props: {
    booking: {
      type: Object,
      default: () => ({
        id: 1,
        name: "Cesar",
        document: "25543853",
      })
    },
    showModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      reservation: this.booking
    };
  },
  computed: {},
  created() {},
  methods: {
    openModal() {
      this.$emit("openModal");
    },
    closeModal() {
      this.$emit("closeModal")
    },  
  },
  watch: {
  }
};
</script>

<style>
</style>