<template>
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
        v-for="client in clientsStore.getClients"
        :key="client.id"
      >
        <th class="px-6 whitespace-nowrap dark:text-white">
          {{ client.id }}
        </th>
        <td class="py-4 px-6">{{ client.name }}</td>
        <td class="py-4 px-6">{{ client.dni }}</td>
        <td class="py-4 px-6">
          <button
            @click="clientsStore.setClientToEdit(client)"
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
</template>

<script>
import axios from "axios";
import { useAlertsStore } from "@/stores/alerts.js";
import { useClientsStore } from "@/stores/clients.js";
export default {
  name: "clients-table",
  components: {
  },
  props: [],
  data() {
    return {
      userAlerts: useAlertsStore(),
      clientsStore: useClientsStore(),
      form: {
        name: "",
        dni: "",
        id: "",
        type: "create",
      },
      data_to_edit: null,
    };
  },
  computed: {},
  methods: {
    async getClients() {
      await this.clientsStore.setClients();
    },
    async deleteClient(client) {
      try {
        const res = confirm(
          `¿Desea eliminar al cliente : ${client.name} con documento : ${client.dni}?`
        );
        if (res) {
          await axios.delete(`/clients/${client.id}`);
          this.userAlerts.success("Cliente eliminado!");
          this.getClients();
        }
      } catch (error) {
        console.error(error);
        this.userAlerts.error(error.response.data.message);
      }
    },
  },
  created() {
    this.getClients();
  },
};
</script>
