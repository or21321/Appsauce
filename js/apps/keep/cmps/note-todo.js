export default {
    template: `
     <div class="note-todo">
        <form @submit.prevent="reportVal" >
            <input type="text" v-model="note.data.title" placeholder="Enter list title..">
            <input type="text" v-model="note.data.list" placeholder="Enter comma separated list..">
            <button hidden></button>
        </form>
    </div>
    `,
    data() {
        return {
            note: {
                type: 'noteTodo',
                isPinned: false,
                data: {
                    title: '',
                    list: ''
                },
                style: {
                    backgroundColor: "#DADCE0"
                }
            }
        }
    },

    computed: {

    },

    methods: {
        reportVal() {
            var items = this.note.data.list.split(',')
            if (!items) return
            items = items.map(item => {
                return {
                    txt: item,
                    isRead: false,
                }
            })
            console.log(items)

            const newNote = {
                type: 'noteTodo',
                isPinned: false,
                data: {
                    title: this.note.data.title,
                    list: items
                },
                style: {
                    backgroundColor: "#DADCE0"
                }
            }
            console.log(newNote)

            this.$emit('setInput', newNote)
            this.note = {
            type: 'noteTodo',
            isPinned: false,
            data: {
                title: '',
                list: ''
            },
            style: {
                backgroundColor: "#DADCE0"
            }
        }
    },


}
}