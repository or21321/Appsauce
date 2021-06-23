import noteFilter from '../cmps/note-filter.js'
import noteCompose from '../cmps/note-compose.js'
import noteList from '../cmps/note-list.js'
import { keepService } from '../services/keep-service.js';

export default {
    template: `
    <section class="keep-app">
        <header>
            <div>Menu</div>
            <note-filter @filtered="setFilter"></note-filter>
            <div>LOGO</div>
        </header>
        <note-compose @composed="addNote"></note-compose>
        <note-list :notes="notesToShow" @removed="removeNote"></note-list>
    </section>
    `,
    data() {
        return {
            notes: [],
            filterBy: null,
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

        addNote(note){
            keepService.saveNote(note)
            this.loadNotes()
        },

        removeNote(note){
            keepService.removeNote
        }
    },
    computed: {
        notesToShow() {
            console.log(this.notes)
            if (!this.filterBy) return this.notes;
            const searchTerm = this.filterBy.txt.toLowerCase();
            // const fromPrice = this.filterBy.fromPrice
            // const toPrice = this.filterBy.toPrice
            const notesToShow = this.notes.filter(note => {
                return (note.info.txt.toLowerCase().includes(searchTerm))
            });
            return notesToShow;
        }
    },

    created() {
        this.loadNotes()
    },


    components: {
        noteFilter,
        noteCompose,
        noteList
    }
};