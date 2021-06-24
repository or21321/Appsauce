export default {
    template: `
    <div class="note-compose">
        <input @change="addNote" type="text" v-model="note.info.txt" placeholder="Take a note">    
        <section class="type-buttons">
            <button>txt</button>
            <button>img</button>
            <button>todos</button>
            <button>video</button>
        </section>
        <!-- <section v-if="selected-type">according to type</section> -->
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