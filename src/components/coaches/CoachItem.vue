<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-badge
        v-for="area in areas"
        :key="area.id"
        :type="area"
        :title="area"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button :to="coachContactLink" mode="outline" link
        >Contact</base-button
      >
      <base-button :to="coachDetailsLink" link>View Details</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'firstName', 'lastName', 'areas', 'rate'],

  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    coachContactLink() {
      return `${this.$route.path}/${this.id}/contact`; // /coaches/c1/contact
    },
    coachDetailsLink() {
      return `${this.$route.path}/${this.id}`; // /coaches/c1
    },
  },
  mounted() {
     //console.log(this.id);
  },
 
};
</script>

<style lang="scss" scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
  h3 {
    font-size: 1.5rem;
  }

  h3,
  h4,
  div {
    margin: 0.5rem 0;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>