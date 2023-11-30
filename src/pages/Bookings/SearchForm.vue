<template>
  <form class="flex flex-wrap -mx-3 mb-6" @submit.prevent="handleSubmit">
    <div class="mb-4 w-1/8 ml-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="id">
        ID 
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="id"
        type="number"
        step="1"
        min="1"
        v-model="searchForm.booking_id"
      />
    </div>
    <div class="mb-4 w-1/8 ml-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="arrival_date">
        Fecha de Llegada
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="arrival_date"
        type="date"
        placeholder="00000000"
        v-model="searchForm.arrival_date"
      />
    </div>
    <div class="mb-4 w-1/8 ml-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="client_name">
        Nombre cliente
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="client_name"
        v-model="searchForm.client_name"
        type="text"
        placeholder="Ing Cesar"
      />
    </div>
    <div class="mb-4 w-1/8 ml-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="client_dni">
        Documento cliente
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="client_dni"
        v-model="searchForm.client_dni"
        type="text"
        placeholder="25543853"
      />
    </div>
    <div class="mb-4 mt-8 wrap">
      <button
        class="bg-transparent ml-1 py-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer"
      >
        Buscar
      </button>
      <span
        @click="clearForm"
        class="bg-transparent py-2 px-2 ml-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer"
      >
        Limpiar
      </span>
    </div>
  </form>
</template>

<script>
import { useHotelStore } from '@/stores/hotel';
export default {
  name: "bookings-search-form",
  data() {
    return {
        hotelStore: useHotelStore(),
        searchForm: {
            hotel_id: null,
            arrival_date: '',
            booking_id: '',
            client_name: '',
            client_dni: '',
        }
    };
  },
  computed: {
      
  },
  methods: {
    handleSubmit() {
       this.searchForm.hotel_id = this.hotelStore.getHotelId
       this.$emit('search', this.searchForm)
    },
    clearForm() {
        this.searchForm = {
            id: '',
            arrival_date: '',
            client_name: '',
            client_dni: '',
        }
        this.$emit('clearForm', this.searchForm)
    }
  }
};
</script>