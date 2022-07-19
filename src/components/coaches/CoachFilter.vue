<template>
    <base-card>
        <h2>Find your coach</h2>
        <span class="filter-option">
            <input type="checkbox" id="frontend" checked @change="setFilter">
            <label for="frontend">Frontend</label>
        </span> 
        <span class="filter-option">
            <input type="checkbox" id="backend" checked @change="setFilter">
            <label for="backend">Backend</label>
        </span>
         <span class="filter-option">
            <input type="checkbox" id="career" checked @change="setFilter">
            <label for="career">Career</label>
        </span>
    </base-card>
</template>

<script>
    export default {
        emits:['change-filter'], // views/CoachesList
        data() {
            return {
                filters: {
                    frontend: true,
                    backend: true,
                    career: true
                }
            }
            
        },
        methods: {
            setFilter(e) {
                const inputId = e.target.id;
                const isActive = e.target.checked;
                const updatedFilter = {
                    ...this.filters,
                    [inputId]:isActive
                }
                this.filters = updatedFilter; 
                this.$emit ('change-filter',updatedFilter);
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>