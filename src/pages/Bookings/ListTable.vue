<template>
  <div>
    <Spinner v-if="isLoading"></Spinner>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="py-3 px-6">ID Reserva</th>
          <th scope="col" class="py-3 px-6">Nombre Ciente</th>
          <th scope="col" class="py-3 px-6">Documento</th>
          <th scope="col" class="py-3 px-6">Fecha Llegada</th>
          <th scope="col" class="py-3 px-6">Fecha Salida</th>
          <th scope="col" class="py-3 px-6">Valor</th>
          <th scope="col" class="py-3 px-6">Nº Noches</th>
          <th scope="col" class="py-3 px-6">Nº Huespedes</th>
          <th scope="col" class="py-3 px-6">Estado</th>
          <th scope="col" class="py-3 px-6">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          v-for="booking in bookings"
          :key="booking.id"
        >
          <th class="px-6 whitespace-nowrap dark:text-white">
            {{ booking.id }}
          </th>
          <td class="py-4 px-6">{{ booking.client.name }}</td>
          <td class="py-4 px-6">{{ booking.client.dni }}</td>
          <td class="py-4 px-6">{{ booking.arrival_date }}</td>
          <td class="py-4 px-6 whitespace-nowrap">
            {{ booking.departure_date }}
          </td>
          <td class="py-4 px-6">{{ booking.amount }}</td>
          <td class="py-4 px-6">{{ booking.nights_number }}</td>
          <td class="py-4 px-6">{{ booking.guests.total_guests }}</td>
          <td class="py-4 px-6 capitalize">{{ booking.status }}</td>
          <td class="py-4 px-6">
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
              @change="handleAction($event, booking)"
              v-model="selectActions"
            >
              <option selected value="5">Action</option>
              <option value="0">EDITAR</option>
              <option value="1" v-if="booking.status !== 'cancelada'">
                CANCELAR
              </option>
              <option value="2" v-if="booking.status === 'provisional'">
                CONFIRMAR
              </option>
              <option value="3" v-if="booking.status !== 'provisional'">
                PROVISIONAL
              </option>
              <option value="4">VER</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { useAlertsStore } from "@/stores/alerts";
import Spinner from "@/components/Spinner.vue"
export default {
  name: "bookings-list-table",
  components: {
    Spinner
  },
  props: [],
  data() {
    return {
      bookings: [],
      userAlerts: useAlertsStore(),
      actions: {
        0: "editar",
        1: "cancelada",
        2: "confirmada",
        3: "provisional",
        4: "ver",
      },
      updates_options: [1, 2, 3],
      isLoading: false,
      selectActions: 5
    };
  },
  computed: {},
  methods: {
    async getBookings() {
      try {
        this.isLoading = true;
        const { data } = await axios.get("/bookings");
        this.bookings = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async updateStatus(booking) {
      try {
        this.isLoading = true;
        await axios.put(`/bookings/${booking.id}`,booking);
        this.userAlerts.success("Reservación actualizada!");
        this.getBookings();
      } catch (error) {
        this.userAlerts.error(
          "Ha ocurrido un error por favor contacte con el administrador"
        );
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    handleAction(e, booking) {
      if (this.updates_options.includes(Number(e.target.value))) {
        const booking_updated = {...booking}
        booking_updated.status = this.actions[e.target.value];
        this.updateStatus(booking_updated);
      } else if(this.actions[e.target.value] == "ver"){
       this.$emit("show", booking);
      }


      // Reset select to default
      this.selectActions = 5;
    },
  },
  mounted() {
    this.getBookings();
  },
};
</script>
