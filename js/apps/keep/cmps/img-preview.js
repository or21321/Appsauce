export default {
        props:['note'],
        template:`
        <div>
        <p>{{note.data.title}}</p>
        <img :src="note.data.url">
        </div>
        `,

    
}


