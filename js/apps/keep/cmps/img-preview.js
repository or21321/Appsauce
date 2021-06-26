export default {
        props:['note'],
        template:`
        <div >
                <h3>{{note.data.title}}</h3>
                <img class="note-img" :src="note.data.url">
        </div>
        `,

    
}


