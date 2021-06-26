export default {
    props:['note'],
    template:`
    <div >
        <h4>{{note.data.title}} </h4>
        <p>{{note.data.txt}} </p>
    </div>
    `,

}