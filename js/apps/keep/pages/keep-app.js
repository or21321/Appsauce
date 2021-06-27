import noteFilter from '../cmps/note-filter.js'
import noteList from '../cmps/note-list.js'
import dynamicEdit from '../cmps/dynamic-edit.js'
import dynamicCompose from '../cmps/dynamic-compose.js'
import { keepService } from '../services/keep-service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import { emailService } from '../../email/services/email-service.js';

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
            console.log('note', note);
            keepService.saveNote(note)
                .then(() => {
                    this.loadNotes()
                })

        },

        removeNote(note) {
            keepService.removeNote(note.id)
                .then(() => {
                    this.loadNotes()
                })
        },

        selectNote(note) {
            this.note = note
        },

        closeModal() {
            this.note = null
        },
        formattedTxt(txt) {
            txt = txt.split(' ')

            txt = txt.splice(0, 20)

            const txtToShow = txt.join(' ')

            return txtToShow 
        },
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
        eventBus.$emit('setAppFilter', 'keep')
        eventBus.$on('filtered', this.setFilter)
    },


    components: {
        noteFilter,
        noteList,
        dynamicEdit,
        dynamicCompose
    },
    watch: {
        '$route.path.query.emailId': {
            immediate: true,
            handler() {
                if (this.$route.query.emailId) {
                    console.log('from keep', this.$route.query.emailId);
                    emailService.getById(this.$route.query.emailId)
                        .then(email => {
                            email.subject = this.formattedTxt(email.subject)
                            const newNote = {
                                type: 'noteTxt',
                                isPinned: false,
                                data: {
                                    title: `${email.subject}`,
                                    txt: `${email.body}`
                                },
                                style: {
                                    backgroundColor: "#efeff1"
                                }
                            }
                            this.save(newNote)
                        })
                }
            }
        }
    }
};