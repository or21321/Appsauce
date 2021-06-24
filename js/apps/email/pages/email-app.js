// import emailHeader from "../cmps/email-header.js"
import emailList from "../cmps/email-list.js"
import { emailService } from "../services/email-service.js"
import { eventBus } from "../../../services/event-bus-service.js"

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
                                <span class="material-icons">inbox</span><span>Inbox</span>
                            </div>
                            <div>
                                <span class="material-icons">star</span><span>Starred</span>
                            </div>
                            <div>
                                <span class="material-icons">send</span><span>Sent</span>
                            </div>
                            <div>
                                <span class="material-icons">drafts</span><span>Drafts</span>
                            </div>
                        </div >
                    </div>
                        <router-view></router-view>
                </div>
                <!-- <div class="email-footer">
                    <span>Cofferights</span>
                </div> -->
            </section>
            `,
    components: {
        // emailHeader,
    },
    data() {
        return {
            emails: null,
        }
    },
    created() {
        console.log('email-APP CREATED!');
        // this.loadEmails()
        // eventBus.$on('loadEmails', this.loadEmails())
        eventBus.$emit('setAppFilter', 'email')
    },
    destroyed() {
        console.log('email-APP DESTROYED');
    },
    methods: {
        goToInbox() {
            this.$router.push('/email/inbox')
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