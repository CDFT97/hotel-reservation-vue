import { defineStore } from "pinia";
export const useSpinnerStore = defineStore("spinner", {
  state: () => {
    return {
      show: false,
    };
  },
  getters: {},
  actions: {
    Show() {
      this.show = true;
    },
    Hide() {
      this.show = false;
    },
  },
});
