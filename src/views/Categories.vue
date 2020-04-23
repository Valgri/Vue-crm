<template>
    <div>
        <div class="page-title">
            <h3>Категории</h3>
        </div>
        <section>
            <Loader v-if="loading" />
            <div class="row" v-else>
                <CategoryCreate @created="addNewCategories"/>
                <CategoryEdit/>
            </div>
        </section>
    </div>
</template>


<script>
    import CategoryCreate from '../components/CategoryCreate.vue';
    import CategoryEdit from '../components/CategoryEdit.vue';
    export default {
        name: 'categories',
        components: {
            CategoryCreate,
            CategoryEdit
        },
        data() {
            return {
                categories: [],
                loading: true
            }
        },
        async mounted(){
            this.categories = await this.$store.dispatch('fetchCategories')
            this.loading = false
        },
        methods: {
            addNewCategories(category) {
                this.categories.push(category)
            }
        },
    }
</script>