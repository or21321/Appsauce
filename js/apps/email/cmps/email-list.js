import emailPreview from "./email-preview.js"

export default {
    props: ['emails'],
    template: `
        <!-- <div> -->
            <ul>
                <email-preview v-for="email in emails" :key="email.id" :email="email"></email-preview>
            </ul>
        <!-- </div> -->
    `,
    data() {
        return {

        }
    },
    components: {   
        emailPreview
    },
    created() {
        console.log('email-list created, emails prop:', this.emails);
    },
    mounted() {
        console.log('email-list mounted, emails prop:', this.emails);
    },
}