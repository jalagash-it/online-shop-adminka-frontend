<template>
  <b-container>
    <b-row>
      <b-col v-if="categories">
        {{ JSON.stringify(categories) }}
      </b-col>
    </b-row>
  </b-container>
</template> 

<script>
export default {
  data() {
    return {};
  },
  computed: {
    categories() {
      return this.$store.state.categories.list;
    },
  },
  mounted() {
    this.$store.dispatch("categories/all");
  },
};
</script>