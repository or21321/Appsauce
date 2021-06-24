import emailHeader from "../cmps/email-header.js"
import emailList from "../cmps/email-list.js"
import { emailService } from "../services/email-service.js"
import { eventBus } from "../../../services/event-bus-service.js"

export default {
    template: `
            <section class="email-app"> 
                <email-header></email-header>
                
                <div class="email-main">
                    <div class="email-features-bar">

                        <div class="email-compose">
                            <div>
                                <img src="../../../../img/icons/compose.png" alt="">
                            </div>
                            <div>
                                Compose
                            </div>
                        </div>
                        <div class="email-features">
                            <div>
                                <span class="material-icons">inbox</span><span>Inbox</span>
                            </div>
                            <div>
                                <span class="material-icons">star</span><span>Star</span>
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
                <div class="email-footer">
                    <span>Cofferights</span>
                </div>
            </section>
            `,
    components: {
        emailHeader,
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
    },
    destroyed() {
        console.log('email-APP DESTROYED');
    },
    methods: {
        // loadEmails() {
        //     emailService.query()
        //         .then(emails => {
        //             this.emails = emails
        //             console.log('from email-APP EMAILS:', emails);
                    // this.$router.push('/email/' + emails)
                    // this.$router.push({
                    //     name: 'Inbox',
                    //     params: {
                    //         emails: this.emails
                    //     }
                    // })
                // })
        // },
        showDetails() {
            console.log('showDetails() from email-app');
            // this.inbox = false
        }
    },

}