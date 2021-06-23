
export default {
    template: `
    <section class="note-filter">
        <!-- <form @submit.prevent="filter"> -->
                <input @change="filter" v-model="filterBy.txt" type="text" placeholder="Search...">
        <!-- </form> -->
       
    </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
            },

        };
    },
    methods: {
        filter() {
            this.$emit('filtered', { ...this.filterBy });
        }
    },

};