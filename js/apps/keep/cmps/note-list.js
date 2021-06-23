import notePreview from "./note-preview.js";

export default {
    props: ['notes'],
    template: `
    <ul class="note-list">
        <li v-for="note in notes" :key="note.id">
            <note-preview :note="note" />
            <button @click="remove(note)">remove note</button>
            <!-- <router-link :to="'/book/'+book.id">Details</router-link> -->
        </li>
    </ul>
    `,
    methods: {
        remove(note) {
            this.$emit('removed', note)
        }
    },
    components: {
        notePreview
    }

};