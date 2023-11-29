<template>
  <div>
    <h3 class="text-2xl font-bold text-left py-2">{{ useHotel.hotel != null ? "Hotel Administration" : "Create Hotel" }}</h3>
    <div class="overflow-x-auto relative sm:rounded-lg">
      <template v-if="useHotel.hotel">
        <ListTable></ListTable>
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
import { useHotelStore } from "@/stores/hotel";
import axios from "axios";
export default {
  name: "home",
  components: {
    ListTable,
    CreateForm
  },
  props: [],
  data() {
    return {
      useHotel: useHotelStore(),
    };
  },
  computed: {
    
  },
  methods: {
    async getHotel() {
      try {
        const { data } = await axios.get("/hotels/first");
        this.useHotel.setHotel(data)
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.getHotel()
  },
};
</script>
