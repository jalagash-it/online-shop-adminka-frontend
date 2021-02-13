<template>
  <b-container fluid>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">e-shop</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/categories">Категория</b-nav-item>
          <b-nav-item to="/products">Продукты</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Іздеу">
            </b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">
              Іздеу
            </b-button>
          </b-nav-form>

          <b-nav-item-dropdown right v-if="user">
            <template #button-content>
              <em>{{ user.email }}</em>
            </template>
            <b-dropdown-item href="#">Профиль</b-dropdown-item>
            <b-dropdown-item href="#" @click="logout">Шығу</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right v-else>
            <template #button-content>
              <em>Қонақ</em>
            </template>
            <b-dropdown-item to="/login">Кіру</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <main>
      <Nuxt />
    </main>
  </b-container>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<style scoped>
main {
  width: 100%;
}
</style>
