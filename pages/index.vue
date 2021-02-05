<template>
  <div>
    Админка
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch("auth/current");
  },
};
</script>
