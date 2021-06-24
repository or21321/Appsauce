import emailPreview from "./email-preview.js"
import emailDetails from "../pages/email-details.js"
import { eventBus } from "../../../services/event-bus-service.js"

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
        }
    },
    created() {
        console.log('email-LIST CREATED!, emails:', this.emails);
    },
        destroyed() {
            console.log('email-LIST DESTROYED');
        },
    watch: {
        '$route.params.emails': {
            immediate: true,
            handler() {
                this.emails = this.$route.params.emails;
                if (!this.emails) this.$router.push('/emails')
                // if (!this.emails) eventBus.$emit('')
            },
        },
        mounted() {
            console.log('email-LIST MOUNTED, emails', this.emails);
        },
    }
}