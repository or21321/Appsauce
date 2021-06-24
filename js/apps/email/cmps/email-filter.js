import { eventBus } from "../../../services/event-bus-service.js";

export default {
    template: `
        <div class="email-filter">
        <input type="text"
         placeholder="Search"
         v-model="filterBy.txt"
         @input="filter"
         >
        <select v-model="filterBy.isRead" @change="filter">
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
        </select>
        </div>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
                isRead: 'all'
            }
        };
    },
    methods: {
        filter() {
            eventBus.$emit('filtered', this.filterBy);
            console.log(this.filterBy);
        }
    },

}