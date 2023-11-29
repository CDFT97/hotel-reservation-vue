import { defineStore } from "pinia";

export const useHotelStore = defineStore("hotel", {
    state: () => {
        return {
            hotel: null,
        }
    },
    getters: {
      
    },
    actions: {
        setHotel(hotel) {
            this.hotel = hotel
        }
    }
});
