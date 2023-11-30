import { defineStore } from "pinia";
export const useSpinnerStore = defineStore("spinner", {
  state: () => {
    return {
      show: false,
    };
  },
  getters: {},
  actions: {
    showSpinner() {
      this.show = true;
    },
    hideSpinner() {
      this.show = false;
    },
  },
});
