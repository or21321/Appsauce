//search by title
import { eventBus } from "../../../services/event-bus-service.js"

export default {
    template: `
    <section class="note-filter">
        <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search...">       
    </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
            },

        };
    },
    methods: {
        filter() {
            console.log(this.filterBy)
            eventBus.$emit('filtered', { ...this.filterBy })
            
        }
    },


};