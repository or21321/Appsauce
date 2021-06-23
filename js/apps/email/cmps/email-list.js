import emailPreview from "./email-preview.js"
// import emailDetails from "../pages/email-details.js"

export default {
    props: ['emails'],
    template: `
        <!-- <div> -->
            <ul>
                <email-preview v-for="email in emails" :key="email.id" :email="email"></email-preview>
                <!-- <router-view></router-view> -->
            </ul>
        <!-- </div> -->
    `,
    data() {
        return {

        }
    },
    components: {   
        emailPreview,
        // emailDetails
    },
    created() {
        console.log('email-list created, emails prop:', this.emails);
    },
    mounted() {
        console.log('email-list mounted, emails prop:', this.emails);
    },
}