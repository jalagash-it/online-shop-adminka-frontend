<template>
  <div>
    <h2>Товары</h2>
    <b-button v-b-modal.add-modal style="margin-bottom: 8px">+</b-button>
    <b-table :fields="fields" :items="items"></b-table>
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
          label="Цена"
          label-for="price-input"
          invalid-feedback="Обязательное поле"
          :state="nameState"
        >
          <b-form-input
            id="price-input"
            v-model="newItem.price"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameState: null,
      showAddModal: false,
      newItem: { name: "", price: 0 },
      fields: [
        {
          key: "name",
          label: "Название",
          sortable: true,
        },

        {
          key: "price",
          label: "Цена",
          sortable: true,
        },
      ],
      items:[]
    };
  },
  mounted() {
    const self = this;
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
  },
};
</script>