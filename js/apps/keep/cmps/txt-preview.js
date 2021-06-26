export default {
    props:['note'],
    template:`
    <div >
        <h3>{{note.data.title}} </h3>
        <p>{{note.data.txt}} </p>
    </div>
    `,

}