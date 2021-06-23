import emailPreview from "./email-preview.js"
import emailDetails from "../pages/email-details.js"
import { eventBus } from "../../../services/event-bus-service.js"

export default {
    props: ['emails'],
    template: `
        <!-- <div> -->
            <ul>
                <email-preview  v-for="email in emails" :key="email.id" :email="email"></email-preview>
                <router-view></router-view>
            </ul>
        <!-- </div> -->
    `,
    data() {
        return {
            inboxIsOn: true
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
        console.log('email-list created, emails prop:', this.emails);
        console.log('email-list created, inboxIsOn:', this.inboxIsOn);
        this.inboxIsOn = true
        eventBus.$on('emailSelected', this.showEmailDetails)
    },
    mounted() {
        console.log('email-list mounted, emails prop:', this.emails);
    },
}