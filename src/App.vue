<template>
  <div>
    <AppHeader></AppHeader>
    <router-view v-slot="slotProps">
      <Transition name="route" mode="out-in">
        <Component :is="slotProps.Component"></Component>
      </Transition>
    </router-view>
  </div>
</template>
<script>
import AppHeader from '@/components/layouts/AppHeader.vue';
export default {
  components: {
    AppHeader,
  },
  created() {
    this.$store.dispatch('auth/tryLogin');
  },

  computed: {
    didAutoLogout() {
      return this.$store.getters['auth/didAutoLogout'];
    },
  },
  watch: {
    didAutoLogout(currentValue, oldValue) {
      if (currentValue && currentValue !== oldValue) {
        this.$router.replace('/coaches');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'sass/main';
</style>
