export default {
    template: `
    <div class="note-txt">
        <form @submit.prevent="reportVal" >
            <input type="text" v-model="note.data.title" placeholder="Enter note title..">
            <input type="text" v-model="note.data.txt" placeholder="Write your note...">
            <button hidden></button>
        </form>
    </div>
    `,
    data() {
        return {
            note: {
                type: 'noteTxt',
                isPinned: false,
                data: {
                    title: '',
                    txt: ''
                },
                style: {
                    backgroundColor: "#efeff1"
                }
            }
        }
    },
    methods: {
        reportVal() {
            console.log(this.note)
            this.$emit('setInput', this.note)
            this.note = {
                type: 'noteTxt',
                isPinned: false,
                data: {
                    title: '',
                    txt: ''
                },
                style: {
                    backgroundColor: "#efeff1"
                }
            }
        }
    }
}