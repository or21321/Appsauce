export default {
    template: `
     <div class="note-img">
        <form @change.prevent="reportVal">
        <input  type="text" v-model="note.data.url" placeholder="Enter image URL...">
        <input  type="text" v-model="note.data.title" placeholder="Enter a title...">
        </form>
    </div>
    `,
    data() {
        return {
            note: {
                type: 'noteImg',
                data: {
                    url: null,
                    txt: null
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