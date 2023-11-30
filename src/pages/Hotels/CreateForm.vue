<template>
  <form class="" @submit.prevent="handleSubmit">
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="name"
        >
          Nombre
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="name"
          type="text"
          v-model="form.name"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="address"
        >
          Dirección
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="address"
          type="text"
          v-model="form.address"
          required
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="country"
        >
          Pais
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="country"
          type="text"
          v-model="form.country"
          required
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="state"
        >
          Estado / Departamento
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="state"
          type="text"
          v-model="form.state"
          required
        />
      </div>

      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="city"
        >
          Ciudad
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="city"
          type="text"
          v-model="form.city"
          required
        />
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="nit"
        >
          Nit
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="nit"
          type="text"
          v-model="form.nit"
          required
        />
      </div>

      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="phone"
        >
          Telefono
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="phone"
          v-model="form.phone"
          type="text"
        />
      </div>
    </div>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Guardar
    </button>
  </form>
</template>

<script>
import axios from 'axios';
import { useHotelStore } from '@/stores/hotel';
export default {
  name: "hotel-create-form",
  components: {},
  props: [],
  data() {
    return {
      hotelStore: useHotelStore(),
      form: {
        name: "",
        address: "",
        country: "",
        state: "",
        city: "",
        nit: "",
        phone: ""
      }
    };
  },
  computed: {},
  methods: {
    async handleSubmit() {
      try {
        const {data} =await axios.post("/hotels", this.form);
        this.hotelStore.setHotel(data);
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {},
};
</script>
