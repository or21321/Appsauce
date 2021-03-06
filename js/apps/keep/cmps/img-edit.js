export default {
    props: ['note'],
    template: `
    <section>
        <button @click.stop="closeModal">X</button>
    <form @submit.prevent="updateNote">
        <input type="text" v-model="newNote.data.title">
        <img class="note-img":src="newNote.data.url">
        <input type="text" v-model="newNote.data.url">
        <input type="color" v-model=newNote.style.backgroundColor>
        <button hidden></button>
    </form>
    </section>
    `,

    data() {
        return {
            newNote: null,
        }
    },

    created() {
        this.newNote = this.note
        console.log(this.newNote)
    },

    methods:{
        updateNote() {
            console.log(this.newNote)
            this.$emit('updated',this.newNote)
        },

        closeModal() {
            this.$emit('close')
        },

    }
}

