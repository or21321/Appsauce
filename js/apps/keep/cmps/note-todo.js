export default {
    template: `
     <div class="note-todo">
    <input @change="reportVal" type="text" v-model="note.data.list" placeholder="Enter comma separated list..">
    </div>
    `,
    data() {
        return {
            note: {
                type: 'noteTodo',
                isPinned: false,
                data: {
                    list: ''
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