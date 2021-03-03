<template>
  <div>
    <h2>Товары</h2>
    <b-button v-b-modal.add-modal style="margin-bottom: 8px">+</b-button>
    <b-table :fields="fields" :items="items">
      <template #cell(category_id)="data">
        <b class="text-info">{{ getCategoryName(data.item.category_id) }}</b>
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
        <b-form-group
          label="Цена"
          label-for="price-input"
          invalid-feedback="Обязательное поле"
          :state="priceState"
        >
          <b-form-input
            id="price-input"
            v-model="newItem.price"
            :state="priceState"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Покрытие"
          label-for="covering"
          invalid-feedback="Обязательное поле"
          :state="coveringState"
        >
          <b-form-input
            id="covering"
            v-model="newItem.covering"
            :state="coveringState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Толщина"
          label-for="depth"
          invalid-feedback="Обязательное поле"
          :state="depthState"
        >
          <b-form-input
            id="depth"
            v-model="newItem.depth"
            :state="depthState"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Ширина"
          label-for="width"
          invalid-feedback="Обязательное поле"
          :state="widthState"
        >
          <b-form-input
            id="width"
            v-model="newItem.width"
            :state="widthState"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Длина"
          label-for="height"
          invalid-feedback="Обязательное поле"
          :state="heightState"
        >
          <b-form-input
            id="height"
            v-model="newItem.height"
            :state="heightState"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Ширина волны"
          label-for="wave_width"
          invalid-feedback="Обязательное поле"
          :state="wave_widthState"
        >
          <b-form-input
            id="wave_width"
            v-model="newItem.wave_width"
            :state="wave_widthState"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Высота волны"
          label-for="wave_height"
          invalid-feedback="Обязательное поле"
          :state="wave_heightState"
        >
          <b-form-input
            id="wave_height"
            v-model="newItem.wave_height"
            :state="wave_heightState"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Гарантие"
          label-for="guarantee"
          invalid-feedback="Обязательное поле"
          :state="guaranteeState"
        >
          <b-form-input
            id="guarantee"
            v-model="newItem.guarantee"
            :state="guaranteeState"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
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
        <b-form-group
          label="Цена"
          label-for="price-input"
          invalid-feedback="Обязательное поле"
          :state="priceState"
        >
          <b-form-input
            id="price-input"
            type="number"
            v-model="updatingItem.price"
            :state="priceState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Покрытие"
          label-for="covering"
          invalid-feedback="Обязательное поле"
          :state="coveringState"
        >
          <b-form-input
            id="covering"
            v-model="updatingItem.covering"
            :state="coveringState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Толщина"
          label-for="depth"
          invalid-feedback="Обязательное поле"
          :state="depthState"
        >
          <b-form-input
            id="depth"
            v-model="updatingItem.depth"
            :state="depthState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Ширина"
          label-for="width"
          invalid-feedback="Обязательное поле"
          :state="widthState"
        >
          <b-form-input
            id="width"
            v-model="updatingItem.width"
            :state="widthState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Длина"
          label-for="height"
          invalid-feedback="Обязательное поле"
          :state="heightState"
        >
          <b-form-input
            id="height"
            v-model="updatingItem.height"
            :state="heightState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Ширина волны"
          label-for="wave_width"
          invalid-feedback="Обязательное поле"
          :state="wave_widthState"
        >
          <b-form-input
            id="wave_width"
            v-model="updatingItem.wave_width"
            :state="wave_widthState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Высота волны"
          label-for="wave_height"
          invalid-feedback="Обязательное поле"
          :state="wave_heightState"
        >
          <b-form-input
            id="wave_height"
            v-model="updatingItem.wave_height"
            :state="wave_heightState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Гарантие"
          label-for="guarantee"
          invalid-feedback="Обязательное поле"
          :state="guaranteeState"
        >
          <b-form-input
            id="guarantee"
            v-model="updatingItem.guarantee"
            :state="guaranteeState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { treeToArray } from "../helpers/tree-helper";
/**
  
        'name',
        'category_id',
        'price',
        'covering',
        'depth',
        'width',
        'height',
        'wave_width',
        'wave_height',
        'guarantee'
     
  */
export default {
  data() {
    return {
      nameState: null,
      catState: null,
      priceState: null,
      coveringState: null,
      depthState: null,
      widthState: null,
      heightState: null,
      wave_widthState: null,
      wave_heightState: null,
      guaranteeState: null,
      updatingItem: {},
      showUpdateModal: false,
      newItem: {},
      fields: [
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
        {
          key: "price",
          label: "Цена",
          sortable: true,
        },
        {
          key: "covering",
          label: "Покрытие",
          sortable: true,
        },
        {
          key: "depth",
          label: "Толщина",
          sortable: true,
        },
        {
          key: "width",
          label: "Ширина",
          sortable: true,
        },
        {
          key: "height",
          label: "Длина",
          sortable: true,
        },
        {
          key: "wave_width",
          label: "Ширина волны",
          sortable: true,
        },
        {
          key: "wave_height",
          label: "Высота волны",
          sortable: true,
        },
        {
          key: "guarantee",
          label: "Гарантие",
        },
        {
          key: "actions",
          label: "",
        },
      ],
      items: [],
    };
  },
  mounted() {
    window["test"] = this;
    const self = this;
    this.$store.dispatch("categories/all");
    this.$axios.$get("/products").then((res) => {
      self.items = res;
    });
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      this.catState = valid;
      this.priceState = valid;
      this.coveringState = valid;
      this.depthState = valid;
      this.widthState = valid;
      this.heightState = valid;
      this.wave_widthState = valid;
      this.wave_heightState = valid;
      this.guaranteeState = valid;
      return valid;
    },
    resetModal() {
      this.newItem = {};
      this.nameState = null;
      this.catState = null;
      this.priceState = null;
      this.coveringState = null;
      this.depthState = null;
      this.widthState = null;
      this.heightState = null;
      this.wave_widthState = null;
      this.wave_heightState = null;
      this.guaranteeState = null;
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
  },
};
</script>