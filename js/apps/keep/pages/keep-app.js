import noteFilter from '../cmps/note-filter.js'
import noteList from '../cmps/note-list.js'
import dynamicEdit from '../cmps/dynamic-edit.js'
import dynamicCompose from '../cmps/dynamic-compose.js'
import { keepService } from '../services/keep-service.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
    template: `
    <section class="keep-app">

        <section class="main-content">
            <dynamic-compose @composed="save"></dynamic-compose>
            <note-list :notes="notesToShow" @removed="removeNote" @selected="selectNote"></note-list>
            <dynamic-edit v-if="note" :note="note" @close="closeModal" @updated="save" :style="{ 'background-color': note.style.backgroundColor}"></dynamic-edit>
        </section>
    </section>
    `,
    data() {
        return {
            notes: [],
            filterBy: null,
            note: null

        };
    },
    methods: {
        loadNotes() {
            keepService.query()
                .then(notes => {
                    this.notes = notes
                })
        },

        setFilter(filterBy) {
            this.filterBy = filterBy
            console.log(this.filterBy)
        },

        save(note) {
            keepService.saveNote(note)
            .then(()=>{
                this.loadNotes()
            })

        },

        removeNote(note) {
            keepService.removeNote(note.id)
            .then(()=>{
                this.loadNotes()
            })
        },

        selectNote(note) {
            this.note = note
        },

        closeModal() {
            this.note = null
        }
    },
    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes;
            const searchTerm = this.filterBy.title.toLowerCase();
            console.log(this.filterBy.title)
           
            const notesToShow = this.notes.filter(note => {
                console.log(note.data.title)
                return (note.data.title.toLowerCase().includes(searchTerm))
            });
            return notesToShow;
        }
    },

    created() {
        this.loadNotes()
        eventBus.$emit('setAppFilter','keep')
        eventBus.$on('filtered',this.setFilter)
    },


    components: {
        noteFilter,
        noteList,
        dynamicEdit,
        dynamicCompose
    }
};