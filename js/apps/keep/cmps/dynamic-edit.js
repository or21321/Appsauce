import noteTxt from './txt-edit.js'
import noteImg from './img-edit.js'
import noteTodo from './todo-edit.js'

export default {
    props: ['note'],
    template: `
    <component :is="note.type" :note="note" class="note-edit" @updated="updateNote" @close="closeModal">
    </component>

    `,

    // created() {
    // this.noteToEdit = this.note
    // console.log(this.noteToEdit)
    // },

    methods: {
        

        updateNote(ev) {
            console.log(ev)
            this.$emit('updated',ev)
        },

        closeModal() {
            this.$emit('close')
        }
    },

    components:{
        noteTxt,
        noteImg,
        noteTodo
    },

    computed: {
        // txt() {
        //     const txt = this.note.info.txt
        //     this.newNote.info.txt = txt
        //     return txt

        // }
    }
}