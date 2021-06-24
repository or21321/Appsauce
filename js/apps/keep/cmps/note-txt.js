export default {
    template: `
    <div class="note-txt">
    <input @change="reportVal" type="text" v-model="note.data.txt" placeholder="Write your note...">
    </div>
    `,
    data() {
        return {
            note: {
                type: 'noteTxt',
                isPinned: false,
                data: {
                    txt: ''
                },
                style: {
                    backgroundColor: "#00d"
                }
            }
        }
    },
    methods: {
        reportVal() {
            console.log(this.note)
            this.$emit('setInput', this.note)
        }
    }
}