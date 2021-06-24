export default {
    props: ['note'],
    template: `
    <section class="note-edit">
        <form @submit="updateNote">
            <input type="text" v-model="noteToEdit.info.txt">
        </form>
        <button @click="closeModal">X</button>
    </section>
    `,

    data() {
        return {
            noteToEdit: null,             
        }
    },

    created() {
    this.noteToEdit = this.note
    console.log(this.noteToEdit)
    },

    methods: {
        closeModal() {
            this.$emit('closed')
        },

        updateNote() {
            this.$emit('updated',this.noteToEdit)
        }
    },

    computed: {
        // txt() {
        //     const txt = this.note.info.txt
        //     this.newNote.info.txt = txt
        //     return txt

        // }
    }
}