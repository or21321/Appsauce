export default {
    props: ['note'],
    template: `
    <div>
        <h3>{{note.data.title}}</h3>
        <ul class="todo-list">
            <li v-for="item in note.data.list" class="todo-item">
                <input type="checkbox" id="item.txt" name="item.txt">
                <label for="item.txt">{{item.txt}}</label>
            </li>
        </ul>
    </div>
   
    `,

    computed: {

    }
}




