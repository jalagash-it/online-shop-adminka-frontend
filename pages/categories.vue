<template>
  <b-container>
    <b-row>
      <b-col v-if="categories">
        <Tree :data="categories" />
      </b-col>
    </b-row>
  </b-container>
</template> 

<script>
import Tree from "~/components/Tree";
export default {
  components: {
    Tree,
  },
  data() {
    return {};
  },
  computed: {
    categories() {
      return this.$store.state.categories.tree;
    },
  },
  mounted() {
    this.$store.dispatch("categories/all");
  },
};
</script>