import emailPreview from "./email-preview.js"
import emailDetails from "../pages/email-details.js"
import { eventBus } from "../../../services/event-bus-service.js"
import { emailService } from "../services/email-service.js"

export default {
    template: `
        <!-- <div> -->
            <ul>
                <email-preview  v-for="email in emails" :key="email.id" :email="email"></email-preview>
                <!-- <router-view></router-view> -->
            </ul>
        <!-- </div> -->
    `,
    data() {
        return {
            emails: []
        }
    },
    components: {
        emailPreview,
        emailDetails
    },
    methods: {
        showEmailDetails() {
            console.log('showEmailDetails from book-list');
        },
        loadEmails() {
            emailService.query()
                .then(emails => {
                    this.emails = emails
                    console.log('from email-LIST, loadEmails returns:', emails);
                })
        }
    },
    created() {
        console.log('email-LIST CREATED!, loadEmails()')
        this.loadEmails()
    },
    destroyed() {
        console.log('email-LIST DESTROYED');
    },
    // watch: {
    //     '$route.params.emails': {
    //         immediate: true,
    //         handler() {
    //             this.emails = this.$route.params.emails;
    //             // if (!this.emails) this.$router.push('/emails')
    //             // if (!this.emails) eventBus.$emit('')
    //         },
    //     },
}
