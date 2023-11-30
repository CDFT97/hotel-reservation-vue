<template>
  <div>
    <h3 class="text-2xl font-bold text-left py-2">{{ useHotel.hotel != null ? "Reportes de Hotel" : "Crear Hotel" }}</h3>
    <div class="overflow-x-auto relative sm:rounded-lg">
      <template v-if="useHotel.hotel">
        <ListTable @show="setBookingToShow"></ListTable>
        <DetailsModal :booking="booking_details" :showModal="showModal" @openModal="openModal" @closeModal="closeModal"></DetailsModal>
      </template>

      <template v-else>
        <CreateForm></CreateForm>
      </template>
    </div>
  </div>
</template>

<script>
import ListTable from "@/pages/Bookings/ListTable.vue";
import CreateForm from "@/pages/Hotels/CreateForm.vue";
import DetailsModal from "@/pages/Bookings/DetailsModal.vue";
import { useHotelStore } from "@/stores/hotel";
import axios from "axios";
export default {
  name: "home",
  components: {
    ListTable,
    CreateForm,
    DetailsModal
  },
  props: [],
  data() {
    return {
      useHotel: useHotelStore(),
      booking_details: {},
      showModal: false
    };
  },
  computed: {
    
  },
  methods: {
    async getHotel() {
      try {
        const { data } = await axios.get("/hotels/first");
        this.useHotel.setHotel(data)
      } catch (error) {
        console.error(error);
      }
    },
    setBookingToShow(booking) {
      this.booking_details = booking
      this.showModal = true;
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  },
  mounted() {
    this.getHotel()
  },
};
</script>
