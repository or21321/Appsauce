export default {
    props: ['note'],
    template: `
    <div>
        <h4>{{note.data.title}}</h4>
        <ul class="todo-list">
            <li v-for="item in note.data.list" class="todo-item" >
                <input type="checkbox" id="item.txt" name="item.txt" :checked="item.isRead">
                <label for="item.txt">{{item.txt}}</label>
            </li>
        </ul>
    </div>
   
    `,

    data() {
        return {

        }
    },

    methods: {

    },

    computed: {

    }
}




