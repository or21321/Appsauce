// import emailHeader from "../cmps/email-header.js"
import emailList from "../cmps/email-list.js"
import { emailService } from "../services/email-service.js"
import { eventBus } from "../../../services/event-bus-service.js"
import emailStatus from "../cmps/email-status.js"
// import progressBar from "../cmps/progress-bar.js"

export default {
    template: `
            <section class="email-app app-main"> 
                <!-- <email-header></email-header> -->
                
                <div class="email-main">
                    <div class="email-features-bar">

                        <div class="email-compose-btn" @click="goToEmailCompose">
                            <div>
                                <img src="../../../../img/icons/compose.png" alt="">
                            </div>
                            <div>
                                Compose
                            </div>
                        </div>
                        <div class="email-features">
                            <div @click="goToInbox">
                                <span class="material-icons" style="font-size: 22px">inbox</span>
                                <span class="inbox-span">Inbox</span><span class="inbox-size">{{inboxSize}}</span>
                            </div>
                            <div @click="goToStarred">
                                <span class="material-icons" style="font-size: 22px">star</span><span>Starred</span>
                            </div>
                            <div @click="goToSent">
                                <span class="material-icons" style="font-size: 22px">send</span><span>Sent</span>
                            </div>
                            <div>
                                <span class="material-icons" style="font-size: 22px">drafts</span><span>Drafts</span>
                            </div>
                        </div >
                        <email-status></email-status>
                        <!-- <progress-bar :percentage="100" :label="'Read emails'"></progress-bar> -->
                    </div>
                        <router-view @inboxSize="setInboxSize"></router-view>
                </div>
                <!-- <div class="email-footer">
                    <span>Cofferights</span>
                </div> -->

            </section>
            `,
    components: {
        emailStatus,
        // progressBar
    },
    data() {
        return {
            emails: null,
            inboxSize: null
        }
    },
    created() {
        console.log('email-APP CREATED!');
        // this.loadEmails()
        // eventBus.$on('loadEmails', this.loadEmails())
        eventBus.$emit('setAppFilter', 'email')
        eventBus.$on('emailRemoved', this.setInboxSize)
    },
    destroyed() {
        console.log('email-APP DESTROYED');
    },
    computed: {
    },
    methods: {
        setInboxSize(emailsLength) {
            if (!emailsLength) {
                emailService.query()
                    .then(emails => {
                        console.log('emails.length', emails.length);
                        this.inboxSize = emails.length
                    })
            }
            console.log('INBOX SIZE', emailsLength);
            this.inboxSize = emailsLength
        },
        goToInbox() {
            this.$router.push('/email/inbox')
        },
        goToStarred() {
            this.$router.push('/email/inbox/starred')
        },
        goToSent() {
            this.$router.push('/email/inbox/sent')
        },
        goToEmailCompose() {
            this.$router.push('/email/compose')
        },
        showDetails() {
            console.log('showDetails() from email-app');
            // this.inbox = false
        }
    },

}