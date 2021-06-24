export default {
    props: ['note'],
    template: `
    <div>
    {{listItems}}
    </div>

   
    `,

    data() {

    },

    computed: {
        listItems() {
            const items = this.note.data.list.split(',')
            console.log(item)
            return items
        }
    }


}

