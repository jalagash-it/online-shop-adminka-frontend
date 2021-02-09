<template>
  <ul class="tree-list-ul">
    <li>
      <div class="node-item">
        <b-button size="sm" variant="light" @click="toggleExpand(data)">
          <b-icon v-if="data.isExpanded" icon="arrow-down"> </b-icon>
          <b-icon v-else icon="arrow-right"> </b-icon>
        </b-button>
        <b-icon icon="folder"></b-icon>
        {{ (data.node && data.node.name) || "--" }}

        <span class="node-actions">
          <b-button size="sm" @click="addGroup(data)">
            <b-icon icon="folder-plus"></b-icon>
          </b-button>
          <b-button size="sm" @click="editGroup(data.node)" v-if="data.node">
            <b-icon icon="pencil-square"></b-icon>
          </b-button>
          <b-button size="sm" @click="removeGroup(data)" v-if="data.node">
            <b-icon icon="trash"></b-icon>
          </b-button>
        </span>
      </div>
      <template v-if="data.isExpanded && data.children.length">
        <Tree :data="ch" v-for="ch in data.children" :key="ch.id" />
      </template>
    </li>
    <b-modal
      v-model="creatingGroupModal"
      v-if="creatingGroup != null"
      @ok="create"
    >
      <b-form-group label-size="sm" label="Название группы">
        <b-form-input size="sm" v-model="creatingGroup.name"></b-form-input>
      </b-form-group>
    </b-modal>
    <b-modal
      v-model="editingGroupModal"
      v-if="editingGroup != null"
      @ok="updateGroup"
    >
      <b-form-group label-size="sm" label="Название группы">
        <b-form-input size="sm" v-model="editingGroup.name"></b-form-input>
      </b-form-group>
    </b-modal>
  </ul>
</template>

<script>
export default {
  name: "Tree",
  props: ["data"],
  data() {
    return {
      creatingGroup: null,
      creatingGroupModal: false,
      editingGroup: null,
      editingGroupModal: false,
    };
  },
  methods: {
    toggleExpand(n) {
      this.$store.commit("categories/toggleExpand", n);
    },
    addGroup(n) {
      console.log(n);
      this.creatingGroup = {
        id: new Date().getTime(),
        name: "жаңа категория",
        children: [],
        parent: n,
      };
      this.creatingGroupModal = true;
    },
    create() {
      this.$store.dispatch("categories/create", this.creatingGroup);
    },
    editGroup({ id, name, parent_id }) {
      const obj = { id, name, parent_id };
      this.editingGroup = obj;
      this.editingGroupModal = true;
    },
    updateGroup() {
      this.$store.dispatch("categories/update", this.editingGroup);
    },
    removeGroup(data) {
      if (!data || !data.node) return;
      const confirmed = confirm(
        `Удалить "${data.node.name}" и все ее содержимое ?`
      );
      if (confirmed !== true) return;
      this.$store.dispatch("categories/remove", data);
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
