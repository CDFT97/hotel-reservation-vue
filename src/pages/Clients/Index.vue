<template>
  <div>
    <form class="flex flex-wrap -mx-3 mb-6" @submit.prevent="handleSubmit">
      <div class="mb-4 w-1/4 ml-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Nombre
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Cesar"
          required
        />
      </div>
      <div class="mb-4 w-1/4 ml-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="document"
        >
          Documento
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="document"
          v-model="form.dni"
          type="text"
          placeholder="00000000"
          required
        />
      </div>
      <div class="mb-4 mt-8 wrap">
        <button
          class="bg-transparent ml-1 py-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer"
        >
          {{ this.form.type === "create" ? "Crear" : "Actualizar" }}
        </button>
        <span
          @click="clear"
          class="bg-transparent py-2 px-2 ml-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer"
        >
          Limpiar
        </span>
      </div>
    </form>
    <Spinner v-if="isLoading"></Spinner>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="py-3 px-6">ID</th>
          <th scope="col" class="py-3 px-6">Nombre</th>
          <th scope="col" class="py-3 px-6">Documento</th>
          <th scope="col" class="py-3 px-6">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          v-for="client in clients"
          :key="client.id"
        >
          <th class="px-6 whitespace-nowrap dark:text-white">
            {{ client.id }}
          </th>
          <td class="py-4 px-6">{{ client.name }}</td>
          <td class="py-4 px-6">{{ client.dni }}</td>
          <td class="py-4 px-6">
            <button
              @click="editClient(client)"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Editar
            </button>
            <button
              @click="deleteClient(client)"
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
  <script>
import axios from "axios";
import { useAlertsStore } from "@/stores/alerts";
import Spinner from "@/components/Spinner.vue";
export default {
  name: "bookings-list-table",
  components: {
    Spinner,
  },
  props: [],
  data() {
    return {
      userAlerts: useAlertsStore(),
      clients: [],
      form: {
        name: "",
        dni: "",
        id: "",
        type: "create",
      },
      isLoading: false,
      client_to_edit: {},
    };
  },
  computed: {},
  methods: {
    async getClients() {
      try {
        this.isLoading = true;
        const { data } = await axios.get("/clients");
        this.clients = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteClient(client) {
      try {
        const res = confirm(
          `¿Desea eliminar al cliente : ${client.name} con documento : ${client.dni}?`
        );
        if (res) {
          this.isLoading = true;
          await axios.delete(`/clients/${client.id}`);
          this.userAlerts.success("Cliente eliminado!");
          this.getClients();
        }
      } catch (error) {
        console.error(error);
        this.useAlertsStore.error(
          "Ha ocurrido un error por favor contacte con el administrador"
        );
      } finally {
        this.isLoading = false;
      }
    },
    editClient(client) {
      this.form.name = client.name;
      this.form.dni = client.dni;
      this.form.id = client.id;
      this.form.type = "update";
      this.client_to_edit = client;
    },
    clear() {
      this.form.name = "";
      this.form.dni = "";
      this.form.id = "";
      this.form.type = "create";
    },
    async handleSubmit() {
      try {
        this.isLoading = true;
        if (this.form.type === "create") await this.create();
        else await this.update();
        this.getClients();
        this.clear();
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async update() {
      try {
        this.client_to_edit.dni = this.form.dni;
        this.client_to_edit.name = this.form.name;
        await axios.put(`/clients/${this.form.id}`, this.client_to_edit);
        this.userAlerts.success("Cliente Actualizado!");
      } catch (error) {
        console.error(error);
        this.useAlertsStore.error(
          "Ha ocurrido un error por favor contacte con el administrador"
        );
      }
    },
    async create() {
      try {
        await axios.post("/clients", this.form);
        this.userAlerts.success("Cliente agregado!");
      } catch (error) {
        console.error(error);
        this.useAlertsStore.error(
          "Ha ocurrido un error por favor contacte con el administrador"
        );
      }
    },
  },
  mounted() {
    this.getClients();
  },
};
</script>
  