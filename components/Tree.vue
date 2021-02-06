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
          <b-button size="sm" @click="editGroup(n)">
            <b-icon icon="pencil-square"></b-icon>
          </b-button>
          <b-button size="sm" @click="removeGroup(n)">
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
    editGroup(n) {
      this.editingGroup = n;
      this.editingGroupModal = true;
    },
    updateGroup() {
      this.$store.dispatch("categories/updateGroup", this.editingGroup);
    },
    removeGroup(n) {
      const confirmed = confirm(`Удалить "${data.name}" и все ее содержимое ?`);
      if (!confirmed) return;
      const idx = this.nodeArr.indexOf(n);
      this.nodeArr.splice(idx, 1);
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
