<template>
 <div>
    <section>
      <base-card>
        <h3>{{ fullName }}</h3>
        <h4>${{ rate }}/hour</h4>
      </base-card>
    </section>
  
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink"> Contact </base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
  
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area.id"
          :type="area"
          :title="area"
        >
        </base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
 </div>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    fullName() {
      const {firstName,lastName} = this.selectedCoach 
      return firstName + ' ' + lastName;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
    contactLink() {
      return `${this.$route.path}/${this.id}/contact`; // /coaches/c1/contact
    },
  },
  data() {
    return {
      selectedCoach: null,
    };
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (c) => c.id === this.id
    );
  },
};
</script>

<style lang="scss" scoped>
</style>