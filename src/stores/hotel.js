import { defineStore } from "pinia";

export const useHotelStore = defineStore("hotel", {
    state: () => {
        return {
            hotel: null,
        }
    },
    getters: {
        getHotelId: (state) => state.hotel !== null ? state.hotel.id : null,
    },
    actions: {
        setHotel(hotel) {
            this.hotel = hotel
        }
    }
});
