import noteFilter from '../cmps/note-filter.js'
import noteCompose from '../cmps/note-compose.js'
import noteList from '../cmps/note-list.js'
import noteEdit from '../cmps/note-edit.js';
import { keepService } from '../services/keep-service.js';

export default {
    template: `
    <section class="keep-app">
        <header class="keep-header">
            <button class="menu">Menu</button>
            <note-filter @filtered="setFilter"></note-filter>
            <div>LOGO</div>
        </header>
        <section class="main-content">
            <note-compose @composed="save"></note-compose>
            <dynamic-compose @composed="save"></dynamic-compose>
            <note-list :notes="notesToShow" @removed="removeNote" @selected="selectNote"></note-list>
            <note-edit v-if="note" :note="note" @closed="closeModal" @updated="save"></note-edit>
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
            // keepService.editNote(note)
            this.note = note
        },

        closeModal() {
            this.note = null
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
        noteList,
        noteEdit
    }
};