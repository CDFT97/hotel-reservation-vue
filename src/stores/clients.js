import { defineStore } from "pinia";
import axios from "axios";
export const useClientsStore = defineStore("clients", {
  state: () => {
    return {
      clients_list: [],
      form: {
        name: "",
        dni: "",
        id: "",
        type: "create",
      },
    };
  },
  getters: {
    getClients: (state) => state.clients_list,
    getClientToEdit: (state) => state.client_to_edit,
  },
  actions: {
    async setClients() {
      try {
        const { data } = await axios.get("/clients");
        this.clients_list = data;
      } catch (error) {
        console.error(error);
      }
    },
    setClientToEdit(data) {
      this.form.name = data.name;
      this.form.dni = data.dni;
      this.form.id = data.id;
      this.form.type = "update";
    },
    resetForm() {
      this.form.name = "";
      this.form.dni = "";
      this.form.id = "";
      this.form.type = "create";
    }
  },
});
