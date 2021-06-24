import noteTxt from './note-txt.js'
import noteImg from './note-img.js'

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

            </div>
    </div>
    `,
//  :data="cmpData" 
    data() {
        return {
            cmps: [
                {
                    type: 'noteTxt',
                    isPinned: true,
                    data: {
                        txt: "Fullstack Me Baby!"
                    },
                    style: {
                        backgroundColor: "#00d"
                    }
                },
                {
                    type: 'noteImg',
                    data: {
                        url: "http://some-img/me",
                        title: "Me playing Mi"
                    },
                    style: {
                        backgroundColor: "#00d"
                    }
                },
                {
                    type: 'noteTodos',
                    data: {
                        label: "How was it:",
                        todos: [
                            { txt: "Do that", doneAt: null },
                            { txt: "Do this", doneAt: 187111111 }
                        ]
                    },
                    style: {
                        backgroundColor: "#00d"
                    }

                }
            ],

            cmpType: 'noteTxt',
            // cmpData: null

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
    }
}
