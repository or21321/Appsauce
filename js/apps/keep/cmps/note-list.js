//img sizing
//coluns width
import notePreview from "./dynamic-preview.js";

export default {
    props: ['notes'],
    template: `
    <ul class="note-list">
        <li v-for="note in notes" :key="note.id" class="list-item" :style="{ 'background-color': note.style.backgroundColor}">
            <note-preview :note="note" @selected="selectNote" />
            <div class="btn-delete" @click="remove(note)"><img src="icons/delete.png"></div>
        </li>
    </ul>
    `,
    methods: {
        remove(note) {
            this.$emit('removed', note)
        },

        selectNote(note){
            this.$emit('selected',note)
        },



    },
    components: {
        notePreview
    }

};