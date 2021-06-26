//how to not fire event when moving from one input to another to add title

import noteTxt from './note-txt.js'
import noteImg from './note-img.js'
import noteTodo from './note-todo.js'

export default {
    template: `
    <div class="note-compose">
            <component 
            :is="cmpType" 
            @setInput="addNote"> 
            </component>
            <div>
                <button @click="setCmp('noteTxt')">txt</button>
                <button @click="setCmp('noteImg')">img</button>
                <button @click="setCmp('noteTodo')">todo</button>

            </div>
    </div>
    `,
    data() {
        return {
            cmpType: 'noteTxt',
        }
    },
    methods: {
        setCmp(type) {
            this.cmpType = type
            // const foundCmp = this.cmps.find(cmp => {
            //     return cmp.type === this.cmpType
            // })
            // this.cmpData = foundCmp.data
            // console.log(this.cmpData)

        },

        addNote(ev) {
            // console.log(ev)
            this.$emit('composed', ev)
        
        }

    },

    components: {
        noteTxt,
        noteImg,
        noteTodo
    }
}
