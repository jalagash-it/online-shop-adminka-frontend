<template>
  <ul class="tree-list-ul">
    <li>
      <div class="node-item">
        <b-button size="sm" variant="light" @click="toggleExpand(data)">
          <b-icon v-if="data.isExpanded" icon="arrow-down"> </b-icon>
          <b-icon v-else icon="arrow-right"> </b-icon>
        </b-button>
        {{ (data.node && data.node.name) || "корень" }}
      </div>
      <template v-if="data.isExpanded && data.children.length">
        <Tree :data="ch" v-for="ch in data.children" :key="ch.id" />
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Tree",
  props: ["data"],
  methods: {
    toggleExpand(n) {
      this.$store.commit("categories/toggleExpand", n);
    },
  },
};
</script>
<style>
.tree-list-ul {
  list-style: none;
  margin: 8px 0;
}

.tree-list-ul > li {
  margin: 8px 0;
}
.node-item:hover > .node-actions {
  display: inline;
}
.node-actions {
  display: none;
  margin-left: 8px;
}
</style>
