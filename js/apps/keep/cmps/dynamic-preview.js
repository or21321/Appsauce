import noteImg  from './img-preview.js'
import noteTxt  from './txt-preview.js'
import noteTodo from './todo-preview.js'

export default {
    props: ['note'],
    template: `
    <component :is="note.type" :note="note" @click.native="select" class="dynamic-preview"></component>
    `,

    methods: {
        select() {
            console.log(this.note)
            this.$emit('selected', this.note)
        },
    },

    components: {
        noteTxt,
        noteImg,
        noteTodo
    }
}