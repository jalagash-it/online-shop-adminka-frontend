<template>
  <div>
    <h2>Товары</h2>
    <b-button v-b-modal.add-modal style="margin-bottom: 8px">+</b-button>
    <b-table :fields="fields" :items="items">
      <template #cell(category_id)="data">
        <b class="text-info">{{ getCategoryName(data.item.category_id) }}</b>
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
      showAddModal: false,
      newItem: { name: "", price: 0 },
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
      return valid;
    },
    resetModal() {
      this.newItem.name = "";
      this.newItem.price = 0;
      this.nameState = null;
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