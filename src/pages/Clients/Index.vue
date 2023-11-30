<template>
  <div>
    <ClientForm></ClientForm>
    <Spinner></Spinner>
    <ClientTable/>
  </div>
</template>
  
<script>
import Spinner from "@/components/Spinner.vue";
import ClientForm from "@/pages/Clients/ClientForm.vue";
import ClientTable from "@/pages/Clients/ClientTable.vue";
export default {
  name: "bookings-list-table",
  components: {
    Spinner,
    ClientForm,
    ClientTable
  },
  props: [],
  data() {
    return {
    };
  },
  computed: {},
  methods: {},
  mounted() {
  },
};
</script>
  