export default {
    template: `
     <div class="note-img">
        <form @submit.prevent="reportVal">
            <input  type="text" v-model="note.data.title" placeholder="Enter a title...">
            <input  type="text" v-model="note.data.url" placeholder="Enter image URL...">
            <button hidden></button>
        </form>
    </div>
    `,
    data() {
        return {
            note: {
                type: 'noteImg',
                data: {
                    title: null,
                    url: null,
                },
                style: {
                    backgroundColor: "#DADCE0"
                }
            }
        }
    },
    methods: {
        reportVal() {
            console.log(this.note)
            this.$emit('setInput', this.note)
            this.note = {
                type: 'noteImg',
                data: {
                    txt: null,
                    url: null,
                },
                style: {
                    backgroundColor: "#DADCE0"
                }
            }
        }
    }
}