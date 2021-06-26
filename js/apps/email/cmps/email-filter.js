import { eventBus } from "../../../services/event-bus-service.js";

export default {
    template: `
        <div class="email-filter">
        <span @click="filter" class="material-icons">search</span>
        <input type="text"
         placeholder="Search mail"
         v-model="filterBy.txt"
         @input="filter"
         list="filterByList"
         >
         <!-- <datalist id="filterByList" v-model="filterBy.isread">
             <option value="All">
             <option value="Read">
             <option value="Unread">
         </datalist> -->
         <select v-model="filterBy.isRead" @change="filter">
             <!-- <option :value="null" disabled selected>Filter-By</option> -->
             <!-- <option value="undefined" disabled hidden>Filter-By</option> -->
             <option disabled value="">Filter</option>    
             <option value="all" selected>All</option>
             <option value="read">Read</option>
             <option value="unread">Unread</option>
             <!-- <v-select :options="['Canada', 'United States']"></v-select> -->
            </select>
        </div>
         <!-- <v-select  v-model="filterBy.isread" :options="Hey" placeholder="filterBy.isRead"></v-select> -->
    `,
    data() {
        return {
            filterBy: {
                txt: '',
                isRead: ''
            },
            searchIcon: '<span class="material-icons">search</span>'
        };
    },
    methods: {
        filter() {
            eventBus.$emit('filtered', this.filterBy);
            // this.filterBy.isRead = 
            console.log(this.filterBy);
        }
    },

}