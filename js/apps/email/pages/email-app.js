import emailHeader from "../cmps/email-header.js"
// import { router } from "../../../routes.js"
import emailList from "../cmps/email-list.js"
import { emailService } from "../services/email-service.js"
// import emailDetails from "./email-details.js"
import { eventBus } from "../../../services/event-bus-service.js"

export default {
    template: `
            <section class="email-app"> 
            <email-header></email-header>
         
                <div class="email-main">
                    <!-- <h1>Mail-App</h1> -->
                <div class="email-features">
                    <p>Inbox</p>
                    <p>Starred</p>
                    <p>Sent mail</p>
                    <p>Drafts</p>
                </div >
                <!-- ?better way? -->
                    <router-view v-if="emails" :emails="emails"></router-view>
                    <!-- <router-view v-else></router-view> -->
                    <!-- <email-list v-if="emails" :emails="emails"></email-list> -->
                </div>
            <div class="email-footer">
            <span>Cofferights</span>
            </div>
            </section>
    `,
    components: {
        emailHeader,
        // emailList
    },
    // router,
    data() {
        return {
            emails: null,
            // ?better way?
            // inbox: true
        }
    },
    created() {
        console.log('email-app created!, loadEmails()');
        this.loadEmails()
    },
    methods: {  
        loadEmails() {
            emailService.query()
            .then(emails => {
                console.log('loadEmails() this.emails=:', emails);
                this.emails = emails
            })
        },
        showDetails() { 
            console.log('showDetails() from email-app');
            // this.inbox = false
        }
    },

}