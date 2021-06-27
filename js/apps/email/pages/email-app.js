// import emailHeader from "../cmps/email-header.js"
import emailList from "../cmps/email-list.js"
import { emailService } from "../services/email-service.js"
import { eventBus, showMsg } from "../../../services/event-bus-service.js"
import emailStatus from "../cmps/email-status.js"
import emailCompose from "../cmps/email-compose.js"

export default {
    template: `
            <section class="email-app app-main"> 
                <!-- <email-header></email-header> -->
                
                
                <div class="email-main" v-bind:class="{ open: isMenuOpen }">
                    <div class="email-features-bar">

                        <div class="email-compose-btn" @click="toggleComposeModal">
                            <div>
                                <img src="./img/icons/compose.png">
                            </div>
                            <div>
                                Compose
                            </div>
                        </div>
                        <div class="email-features email-nav">
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
                            <div @click="showMsgMaintenance">
                                <span class="material-icons" style="font-size: 22px">drafts</span><span>Drafts</span>
                            </div>
                        </div >
                        <email-status></email-status>
                    </div>
                        <router-view @replyToEmail="setEmailIdToReply" @inboxSize="setInboxSize"/>
                        <email-compose v-if="isComposeModalOn"
                        @closeComposeModal="isComposeModalOn=false" 
                        :emailId="emailIdToReply"
                        :isComposeModalOn="isComposeModalOn"/>
                        
                </div>
            </section>
            `,
    components: {
        emailStatus,
        emailCompose
    },
    data() {
        return {
            emails: null,
            inboxSize: null,
            isComposeModalOn: false,
            emailIdToReply: null,
            isMenuOpen: false
        }
    },
    created() {
        console.log('email-APP CREATED!');
        eventBus.$emit('setAppFilter', 'email')
        // eventBus.$on('emailRemoved', this.setInboxSize)
        eventBus.$on('closeComposeModal', this.toggleComposeModal)
        eventBus.$on('toggleComposeModal', this.toggleComposeModal)
        eventBus.$on('toggleEmailFeaturesMenu', this.toggleFeaturesMenu)
        eventBus.$on('setInbox-Size', this.setInboxSize)
    },
    destroyed() {
        console.log('email-APP DESTROYED');
    },
    computed: {
    },
    methods: {
        showMsgMaintenance() {
            const msg = {
                txt: 'We are sorry.. Drafts is under maintenance at the moment',
                type: 'error'
            }
            showMsg(msg)
        },
        toggleFeaturesMenu() {
            console.log('hey');
            this.isMenuOpen = !this.isMenuOpen
        },
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
        // setInboxSize() {

        // },
        goToInbox() {
            this.$router.push('/email/inbox')
        },
        goToStarred() {
            this.$router.push('/email/inbox/starred')
        },
        goToSent() {
            this.$router.push('/email/inbox/sent')
        },
        toggleComposeModal() {
            // this.$router.push('/email/compose')
            console.log('CLICKED');

            this.isComposeModalOn = !this.isComposeModalOn
            console.log(this.isComposeModalOn);
        },
        setEmailIdToReply(emailId) {
            console.log('setEmailIdToReply()', emailId);
            this.emailIdToReply = emailId
            this.isComposeModalOn = !this.isComposeModalOn
        },
        showDetails() {
            console.log('showDetails() from email-app');
            // this.inbox = false
        }
    },

}