export default {
    props: ['textToFormat'],
    template: `
        <!-- <section> -->
        <span v-if="txt">{{formattedTxt}}</span>
        <!-- </section> -->
    `,
    data() {
        return {
            txt: ''
        }
    },
    created() {
        console.log('long-TEXT CREATED!');
    },
    mounted() {
        console.log('long-TEXT MOUNTED');
        this.txt = this.textToFormat
    },
    computed: {
        formattedTxt() {
            let txt = this.txt
            // console.log('this.txt', txt);
            txt = txt.split(' ')

            // if (this.showMoreDesc || description.length <= 10) return this.book.description

            txt = txt.splice(0, 12)

            const txtToShow = txt.join(' ')
            // console.log('from long-TEXT, txtToShow', txtToShow);
            return txtToShow + '...'
        },
    },
}