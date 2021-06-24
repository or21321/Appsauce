import noteImg  from './img-preview.js'
import noteTxt  from './txt-preview.js'
// import noteTodo from './todo-preview.js'

export default {
    props: ['note'],
    template: `
    <component :is="note.type" :note="note"  @click="select(note)"></component>
    `,

    methods: {
        select(note) {
            this.$emit('selected', note)
        },
    },

    components: {
        noteTxt,
        noteImg,
        // noteTodo
    }
}