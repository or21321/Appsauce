export default {
        props:['note'],
        template:`
        <div >
                <h4>{{note.data.title}}</h4>
                <img class="note-img" :src="note.data.url">
        </div>
        `,

    
}


