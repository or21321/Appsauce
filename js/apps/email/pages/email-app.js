import emailHeader from "../cmps/email-header.js"
// import { router } from "../../../routes.js"
import emailList from "../cmps/email-list.js"
import { emailService } from "../services/email-service.js"
import { eventBus } from "../../../services/event-bus-service.js"

export default {
    // router,
    template: `
            <section class="email-app"> 
                <email-header></email-header>
                
                <div class="email-main">
                    <!-- <h1>Mail-App</h1> -->
                    <div class="email-features">
                    <p><img src="../../../../img/icons/inbox_black_20dp.png" alt="">    
                        Inbox</p>
                    <p><img src="../../../../img/icons/star.png" alt="">    
                        Starred</p>
                    <p><img src="../../../../img/icons/sent.png" alt="">
                        Sent</p>
                        <p><img src="../../../../img/icons/drafts.png" alt="">
                            Drafts</p>
                    </div >
                    <!-- ?better way? -->
                    <!-- <router-view v-if="emails" :emails="emails"></router-view> -->
                    <router-view></router-view>
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
    data() {
        return {
            emails: null,
            // ?better way?
            // inbox: true
        }
    },
    created() {
        console.log('email-APP CREATED!');
        this.loadEmails()
        // eventBus.$on('loadEmails', this.loadEmails())
    },
    destroyed() {
        console.log('email-APP DESTROYED');
    },
    methods: {
        loadEmails() {
            emailService.query()
                .then(emails => {
                    this.emails = emails
                    // this.$router.push('/email/' + emails)
                    this.$router.push({
                        name: 'Inbox',
                        params: {
                            emails: this.emails
                        }
                    })
                })
        },
        showDetails() {
            console.log('showDetails() from email-app');
            // this.inbox = false
        }
    },

}