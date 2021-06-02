<template>
  <div>
    <h2>Товары</h2>
    <b-button v-b-modal.add-modal style="margin-bottom: 8px">+</b-button>
    <b-table :fields="fields" :items="items" ref="prodTable">
      <template #cell(category_id)="data">
        <b class="text-info">{{ getCategoryName(data.item.category_id) }}</b>
      </template>

      <template #cell(fields)="data">
        <b v-for="(p, idx) in data.item.fields" :key="idx">
          {{ p.key }}:{{ p.val }} |
        </b>
      </template>

      <template #cell(actions)="data">
        <b-button @click="updateProduct(data.item)" variant="outline-secondary">
          edit</b-button
        >
      </template>
    </b-table>
    <b-modal
      id="add-modal"
      title="Добавить новый товар"
      ref="modal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Название"
          label-for="name-input"
          invalid-feedback="Обязательное поле"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="newItem.name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Категория"
          label-for="category_id"
          invalid-feedback="Обязательное поле"
          :state="catState"
        >
          <b-form-select
            v-model="newItem.category_id"
            :options="categoryOptions"
          ></b-form-select>
        </b-form-group>
        <p>Динамические поля</p>
        <b-list-group>
          <b-list-group-item
            v-for="(prop, idx) in newItem.fields"
            :key="idx"
            class="d-flex justify-content-between align-items-center"
          >
            <b-row>
              <b-col cols="5">
                <b-form-input v-model="prop.key"></b-form-input>
              </b-col>
              <b-col cols="5">
                <b-form-input v-model="prop.val"></b-form-input>
              </b-col>
              <b-col cols="2">
                <b-button
                  size="sm"
                  variant="danger"
                  pill
                  @click="removeDynamicProp(prop)"
                >
                  <b-badge variant="danger">
                    <b-icon icon="trash"></b-icon> </b-badge
                ></b-button>
              </b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
        <b-button size="sm" @click="addPropToNewItem">добавить поле</b-button>
      </form>
    </b-modal>
    <b-modal
      id="update-modal"
      v-model="showUpdateModal"
      title="Редактировать товар"
      ref="modal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleUpdateOk"
    >
      <form ref="form" @submit.stop.prevent="handleUpdateSubmit">
        <b-form-group
          label="Название"
          label-for="name-input"
          invalid-feedback="Обязательное поле"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="updatingItem.name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Категория"
          label-for="category_id"
          invalid-feedback="Обязательное поле"
          :state="catState"
        >
          <b-form-select
            v-model="updatingItem.category_id"
            :options="categoryOptions"
          ></b-form-select>
        </b-form-group>
        <p>Динамические поля</p>
        <b-list-group>
          <b-list-group-item
            v-for="(prop, idx) in updatingItem.fields"
            :key="idx"
            class="d-flex justify-content-between align-items-center"
          >
            <b-row>
              <b-col cols="5">
                <b-form-input v-model="prop.key"></b-form-input>
              </b-col>
              <b-col cols="5">
                <b-form-input v-model="prop.val"></b-form-input>
              </b-col>
              <b-col cols="2">
                <b-button
                  size="sm"
                  variant="danger"
                  pill
                  @click="removeDynamicProp(prop)"
                >
                  <b-badge variant="danger">
                    <b-icon icon="trash"></b-icon> </b-badge
                ></b-button>
              </b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
        <b-button size="sm" @click="addPropToUpdatingItem"
          >добавить поле</b-button
        >
        <p>Фото</p>
        <b-list-group>
          <b-list-group-item
            v-for="(prop, idx) in updatingItem.photos"
            :key="idx"
            class="d-flex justify-content-between align-items-center"
          >
            <b-row>
              <b-col cols="10">
                <b>{{ prop.name }}</b>
              </b-col>
              <b-col cols="2">
                <b-button
                  size="sm"
                  variant="danger"
                  pill
                  @click="removePhoto(prop)"
                >
                  <b-badge variant="danger">
                    <b-icon icon="trash"></b-icon> </b-badge
                ></b-button>
              </b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
        <input type="file" ref="inputFile" hidden @change="addPhoto" />
        <b-button size="sm" @click="addPhotoToUpdatingItem"
          >добавить фото</b-button
        >
      </form>
    </b-modal>
  </div>
</template>

<script>
import { treeToArray } from "../helpers/tree-helper";

export default {
  data() {
    return {
      nameState: null,
      catState: null,
      updatingItem: {},
      showUpdateModal: false,
      newItem: { fields: [] },

      items: [],
      dynamicKeys: [],
    };
  },
  mounted() {
    window["test"] = this;
    const self = this;
    this.$store.dispatch("categories/all");
    this.$axios.$get("/products").then((res) => {
      // let keys = new Set();
      // if (res) {
      //   res.forEach((element) => {
      //     element.fields.forEach((x) => keys.add(x.key));
      //   });
      //   this.dynamicKeys = [...keys].sort();
      // }
      self.items = res;
    });
  },
  methods: {
    removePhoto(f) {
      console.log(f);
      let idx = this.updatingItem.photos.indexOf(f);
      this.updatingItem.photos.splice(idx, 1);
      this.$forceUpdate();
    },
    addPhoto() {
      const file = this.$refs.inputFile.files[0];
      let formData = new FormData();
      formData.append("f", file);
      this.$axios
        .$post(`products/${this.updatingItem.id}/addPhoto`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
        });
      this.updatingItem.photos.push(file);

      this.$refs.inputFile.value = "";
      this.$forceUpdate();
    },
    addPhotoToUpdatingItem() {
      this.$refs.inputFile.click();
    },

    addPropToNewItem() {
      this.newItem.fields.push({ key: "", val: "" });
    },

    removeDynamicProp(prop) {
      let idx = this.newItem.fields.indexOf(prop);
      if (idx >= 0) this.newItem.fields.splice(idx, 1);

      idx = this.updatingItem.fields.indexOf(prop);
      if (idx >= 0) this.updatingItem.fields.splice(idx, 1);
    },

    addPropToUpdatingItem() {
      this.updatingItem.fields.push({ key: "", val: "" });
    },

    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      this.catState = valid;
      return valid;
    },
    resetModal() {
      this.newItem = {
        fields: [],
        photos: [],
      };
      this.updatingItem.fields = this.updatingItem.fields || [];
      this.updatingItem.photos = this.updatingItem.photos || [];

      this.nameState = null;
      this.catState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.$axios
        .$post("/products", this.newItem)
        .then(console.log)
        .then(() => {
          this.$nextTick(() => {
            this.$bvModal.hide("add-modal");
          });
        });
    },
    updateProduct(updObj) {
      let obj = {};
      Object.assign(obj, updObj);
      this.updatingItem = obj;
      this.resetModal();
      this.showUpdateModal = true;
    },
    handleUpdateOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleUpdateSubmit();
    },
    handleUpdateSubmit() {
      this.updatingItem.price -= 0;
      this.$axios
        .$put(`/products/${this.updatingItem.id}`, this.updatingItem)
        .then(console.log)
        .then(() => {
          this.$nextTick(() => {
            const old = this.items.find((p) => p.id === this.updatingItem.id);
            Object.assign(old, this.updatingItem);
            this.$bvModal.hide("update-modal");
            this.showUpdateModal = false;
          });
        });
    },

    getCategoryName(c_id) {
      const cat = test.categoryOptions.find((c) => c.value == c_id);
      return cat != null ? cat.text : "Нет категории";
    },
  },
  computed: {
    categories() {
      return this.$store.state.categories.tree;
    },
    categoryOptions() {
      const cats = this.$store.state.categories.tree;
      return cats != null
        ? treeToArray(cats).map((c) => {
            return { value: c.id, text: c.name };
          })
        : [];
    },
    fields() {
      return [
        {
          key: "name",
          label: "Название",
          sortable: true,
        },
        {
          key: "category_id",
          label: "Категория",
          sortable: true,
        },
        { key: "fields", label: "динамические поля" },
        ...this.dynamicKeys,
        {
          key: "actions",
          label: "",
        },
      ];
    },
  },
};
</script>