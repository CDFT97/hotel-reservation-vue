<template>
  <div>
    <InfoAlert
      msg="Se entiende que el cliente es el primer huesped, por lo que se incluye al
      cliente en el número de personas."
    />

    <h3 class="text-2xl font-bold text-left py-2">{{ title }}</h3>

    <div>
      <div class="w-full md:w-1/2 px-3 mb-6 mb-4">
        <select
          @change="setClient"
          v-model="clients_list"
          id="clients"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option selected value="">Seleccione un cliente</option>
          <option v-for="client in clients" :key="client.id" :value="client.id">
            {{ client.name }} - {{ client.dni }}
          </option>
        </select>
      </div>
      <form class="w-full w-3/3" @submit.prevent="handleSubmit">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="client_name"
            >
              Nombre Cliente
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="client_name"
              type="text"
              v-model="form.client_name"
              readonly
              required
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="client_dni"
            >
              Documento Cliente
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="client_dni"
              type="text"
              v-model="form.client_dni"
              required
              disabled
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="num_guests"
            >
              Nº de Personas
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="num_guests-city"
              v-model="form.guests.total_guests"
              type="number"
              min="1"
              step="1"
              required
            />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="arrival_date"
            >
              Fecha de llegada
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="arrival_date-city"
              type="date"
              v-model="form.arrival_date"
              required
            />
          </div>

          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="num_nights"
            >
              Cantidad de noches
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="num_nights"
              @change="setTotalNights"
              type="number"
              v-model="form.nights_number"
              min="1"
              step="1"
              required
            />
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="arrival_date"
            >
              Fecha de salida
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="arrival_date-city"
              type="date"
              v-model="form.departure_date"
              required
              disabled
            />
          </div>
          
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="amount"
            >
              Valor
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="amount"
              v-model="form.amount"
              type="number"
              min="1"
              step="0.01"
              required
            />
          </div>

          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0" v-if="this.mode != 'create'">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="amount"
            >
              Estado
            </label>
            <select
            v-model="form.status"
              id="clients"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected value="">Seleccione un estado</option>
              <option value="provisional">Provisional</option>
              <option value="confirmada">Confirmada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
        </div>
        <div
          class="flex items-center mb-4 mt-2"
          v-if="this.form.guests.total_guests > 1"
        >
          <input
            id="default-checkbox"
            type="checkbox"
            v-model="add_guests"
            class="w-4 h-4 text-blue-600 bg-black border-black rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
          />
          <label
            for="default-checkbox"
            class="ms-2 text-sm font-medium text-gray-900 ml-2 cursor-pointer"
            >Agregar huespedes</label
          >
        </div>
        <section v-if="add_guests">
          <h3 class="text-xl font-bold py-2">Información de los huespedes</h3>
          <div
            class="flex flex-wrap -mx-3 mb-6"
            v-for="(guest, key) in form.guests.total_guests - 1"
            :key="guest"
          >
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="client_name"
              >
                Nombre Huesped Nº {{ guest + 1 }}
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="client_name"
                v-model="form.guests.guests_information[key].name"
                type="text"
                required
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="client_dni"
              >
                Documento Huesped Nº {{ guest + 1 }}
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="client_dni"
                type="text"
                v-model="form.guests.guests_information[key].dni"
                required
              />
            </div>
          </div>
        </section>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Guardar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useAlertsStore } from "@/stores/alerts";
import { useHotelStore } from "@/stores/hotel";
import axios from "axios";
import moment from "moment";
import InfoAlert from "@/components/InfoAlert.vue";
export default {
  name: "create_booking_form",
  components: {
    InfoAlert,
  },
  props: {},
  data() {
    return {
      alertsStore: useAlertsStore(),
      hotelStore: useHotelStore(),
      clients: [],
      title: "Crear Reserva",
      mode: "create",
      form: {
        client_name: "",
        client_dni: "",
        client_id: "",
        hotel_id: "",
        arrival_date: "",
        departure_date: "",
        status: "",
        nights_number: 0,
        amount: 0,
        guests: {
          total_guests: 1,
          guests_information: [],
        },
      },
      add_guests: false,
      clients_list: "",
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.setHotel();
    this.getClients();
    this.checkMethod();
  },
  methods: {
    checkMethod() {
      if (this.$route.params.id) {
        this.title = "Editar Reserva";
        this.getBooking(this.$route.params.id);
      }
    },
    async getBooking(id) {
      try {
        const { data } = await axios.get(`/bookings/${id}`);
        this.fillForm(data);
      } catch (error) {
        console.error(error);
      }
    },
    setHotel() {
      const hotel_id = this.hotelStore.getHotelId;
      if (!hotel_id) this.$router.push({ name: "home" });
      this.form.hotel_id = hotel_id;
    },
    async getClients() {
      try {
        const { data } = await axios.get("/clients");
        this.clients = data;
      } catch (error) {
        console.error(error);
      }
    },
    setClient(e) {
      if (e.target.value) {
        const selected_client = this.clients.find(
          (client) => client.id == e.target.value
        );
        this.form.client_dni = selected_client.dni;
        this.form.client_name = selected_client.name;
        this.form.client_id = selected_client.id;
      } else {
        this.form.client_dni = "";
        this.form.client_name = "";
        this.form.client_id = "";
      }
    },
    setTotalNights() {
      if (!this.form.arrival_date) {
        this.alertsStore.warning("Debe seleccionar la fecha de llegada");
        return (this.form.nights_number = 0);
      }
      this.form.departure_date = moment(this.form.arrival_date)
        .add(this.form.nights_number, "d")
        .format("YYYY-MM-DD");
    },
    addGuests() {
      if (this.form.guests.total_guests > 1) {
        for (let i = 1; i < this.form.guests.total_guests; i++) {
          this.form.guests.guests_information.push({
            name: "",
            dni: "",
          });
        }
      }
    },
    async handleSubmit() {
      if (this.form.client_name == "") {
        return this.alertsStore.warning("Debe seleccionar un cliente");
      }
      if (this.mode === "create") {
        await this.store();
      } else {
        await this.update();
      }
    },
    async store() {
      try {
        await axios.post("/bookings", this.form);
        this.alertsStore.success("Reservación creada");
        this.$router.push({ name: "home" });
      } catch (error) {
        console.error(error);
      }
    },
    async update() {
      try {
        await axios.put(`/bookings/${this.$route.params.id}`, this.form);
        this.alertsStore.success("Reservación Actualizada");
        this.$router.push({ name: "home" });
      } catch (error) {
        console.error(error);
      }
    },
    fillForm(booking) {
      this.mode = "edit";
      this.form.status = booking.status;
      this.form.client_name = booking.client.name;
      this.form.client_dni = booking.client.dni;
      this.form.client_id = booking.client.id;
      this.form.hotel_id = booking.hotel.id;
      this.form.arrival_date = booking.arrival_date;
      this.form.departure_date = booking.departure_date;
      this.form.nights_number = Number(booking.nights_number);
      this.form.amount = Number(booking.amount);
      this.form.guests.total_guests = Number(booking.guests.total_guests);
      if (booking.guests.total_guests > 1) this.add_guests = true;
      this.form.guests.guests_information = booking.guests.guests_information;
      this.clients_list = booking.client.id;
    },
  },
  watch: {
    "form.guests.total_guests"() {
      this.addGuests();
    },
  },
};
</script>
