export default {
    props:['note'],
    template:`
    <p  @click="select(note)">{{note.info.txt}} </p>
    `,

    methods:{
        select(note){
            this.$emit('selected',note)
        },
    }
}