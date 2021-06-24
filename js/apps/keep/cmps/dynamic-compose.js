export default {
    template: `
    <div class="note-compose">
    <component :is="cmpType" @click="callToAction">
               Call to Action!
            </component>

            <select v-model="cmpType" >
                <option>h1</option>
                <option>h2</option>
                <option>p</option>
            </select>
    </div>
    `,

    
    data() {
        return {
            note: {
                type: "noteTxt",
                isPinned: false,
                info: {
                    txt:null,
                }
            }

        }
    },
    methods: {
        addNote() {
            this.$emit('composed', this.note);
            this.note= {
                type: "noteTxt",
                isPinned: false,
                info: {
                    txt:null,
                }

            }
        }
    },
}