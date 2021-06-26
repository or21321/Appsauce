export default {
    props: ['note'],
    template: `
    <section>
    <form @submit.prevent="updateNote">
        <input type="text" v-model="newNote.data.title">
        <input type="text" v-model="newItems" placeholder="Enter comma separated list..">
        <ul class="todo-list">
            <li v-for="item in newNote.data.list" class="todo-item">
                <input type="checkbox" id="item.txt" name="item.txt">
                <label for="item.txt">{{item.txt}}</label>
            </li>
        </ul>
        <input type="color" v-model=newNote.style.backgroundColor>
        <button hidden></button>
    </form>
        <button @click.stop="closeModal">X</button>
    </section>
    `,

    data() {
        return {
            newNote: null,
            newItems: null
        }
    },

    created() {
        this.newNote = this.note
        console.log(this.newNote)
    },

    methods:{

        prepareData() {
            var items = this.newItems.split(',')
            if (!items) return
            items = items.map(item => {
                return {
                    txt: item,
                    isRead: false,
                }
            })
            console.log(items)
            this.newNote.data.list = this.newNote.data.list.concat(items)
            console.log(this.newNote.data.list)
        },
            
    
        updateNote() {
            this.prepareData()
            console.log(this.newNote)
            this.$emit('updated',this.newNote)
            this.newItems = null
        },

        closeModal() {
            this.$emit('close')
        },

    },
}

