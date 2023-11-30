<template>
  <form class="flex flex-wrap -mx-3 mb-6" @submit.prevent="handleSubmit">
    <div class="mb-4 w-1/4 ml-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
        Nombre
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        v-model="useClients.form.name"
        type="text"
        placeholder="Cesar"
        required
      />
    </div>
    <div class="mb-4 w-1/4 ml-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="document">
        Documento
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="document"
        v-model="useClients.form.dni"
        type="text"
        placeholder="00000000"
        required
      />
    </div>
    <div class="mb-4 mt-8 wrap">
      <button
        class="bg-transparent ml-1 py-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer"
      >
        {{ useClients.form.type === "create" ? "Crear" : "Actualizar" }}
      </button>
      <span
        @click="useClients.resetForm"
        class="bg-transparent py-2 px-2 ml-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer"
      >
        Limpiar
      </span>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { useAlertsStore } from "@/stores/alerts";
import { useSpinnerStore } from "@/stores/spinner";
import { useClientsStore } from "@/stores/clients";
export default {
  name: "client-form",
  components: {
  },
  props: ["dataToEdit"],
  data() {
    return {
      useAlerts: useAlertsStore(),
      useClients: useClientsStore(),
      spinnerStore: useSpinnerStore()
    };
  },
  computed: {},
  methods: {
    async handleSubmit() {
      try {
        if (this.useClients.form.type === "create") await this.create();
        else await this.update();
        this.useClients.resetForm();
        this.useClients.setClients();
      } catch (error) {
        console.error(error);
      }
    },
    async update() {
      try {
        this.spinnerStore.showSpinner()
        await axios.put(`/clients/${this.useClients.form.id}`, this.useClients.form);
        this.useAlerts.success("Cliente Actualizado!");
      } catch (error) {
        console.error(error);
        this.useAlerts.error(
          "Ha ocurrido un error por favor contacte con el administrador"
        );
      } finally {
        this.spinnerStore.hideSpinner()
      }
    },
    async create() {
      try {
        this.spinnerStore.showSpinner()
        await axios.post("/clients", this.useClients.form);
        this.useAlerts.success("Cliente agregado!");
      } catch (error) {
        console.error(error);
        this.useAlerts.error(
          "Ha ocurrido un error por favor contacte con el administrador"
        );
      } finally {
        this.spinnerStore.hideSpinner()
      }
    },
  },
  mounted() {
  },
  watch: {}
};
</script>

<style>
</style>