import { emailService } from "../services/email-service.js"
import { showMsg } from "../../../services/event-bus-service.js"

export default {
    template: `
        <div v-if="email" class="email-details">
            <h2>{{email.subject}}</h2>
            <div class="sentby-date">
                <p>{{email.sentBy}}</p>
                <p>{{formatDate}}</p>
                <!-- <p>{{formatDate}}, {{formatTime}}</p> -->
                <div class="details-features">
                    <div class="icon" @click="toggleEmailStarred">
                        <span v-if="isStarred" class="material-icons" style="font-size: 22px; color:#f7cb4d">star</span>
                        <span v-else class="material-icons" style="font-size: 22px">star_border</span>
                        <span class="tooltip-text">Not starred</span>
                    </div>
                    <div class="icon" @click="reply">
                        <span class="material-icons" style="font-size: 22px">reply</span>
                        <span class="tooltip-text">Reply</span>
                    </div>
                    <!-- <span class="material-icons">reply</span> -->
                </div>
            </div>
            <div class="body-container">
                <div class="body">
                    <p>
                        {{email.body}}
                    </p>
                </div>    
            </div>
        </div>
    `,
    data() {
        return {
            email: null,

        }
    },
    created() {
        console.log('email-DETAILS CREATED!, email is read')
    },
    destroyed() {
        console.log('email-DETAILS DESTROYED');
    },
    computed: {
        formatDate() {
            return new Date(this.email.sentAt).toLocaleDateString('he-il')
        },
        formatTime() {
            return new Date(this.email.sentAt).toLocaleTimeString('he-il')
        },
        isStarred() {
            console.log('isStarred()');
            return this.email.isStarred
        }
    },
    watch: {
        // '$route.params.email': {
        //     immediate: true,
        //     handler() {
        //         this.email = this.$route.params.email;
        //     },
        // }
        '$route.params.emailId': {
            immediate: true,
            handler() {
                emailService.getById(this.$route.params.emailId)
                    .then((email) => {
                        if (!email) {
                            console.log('email isnt found in emails array');
                            emailService.getById(this.$route.params.emailId, 'sentEmails')
                                .then(sentEmail => {
                                    console.log('sentEmail', sentEmail);
                                    this.email = sentEmail
                                })
                        }
                        this.email = email
                        console.log('from email-DETAILS, $route.params.emailId watch', email);
                        if (email && email.isRead === 'unread') {
                            email.isRead = 'read'
                            emailService.save(email)
                            console.log('saved email after setting .isRead = true');
                        }
                    })
            }
        }
    },
    methods: {
        reply() {
            console.log('REPLY');
            this.$router.push('/email/compose/' + this.email.id)
            // need to make reply on compose page look better and be smarter!
        },
        toggleEmailStarred() {
            console.log('markAsStar');
            emailService.toggleEmailStarred(this.email.id)
                .then(email => {
                    if (email.isStarred) {
                        const msg = {
                            txt: 'Email starred',
                            type: 'success'
                        }
                        showMsg(msg)
                    }
                    else {
                        const msg = {
                            txt: 'Email unstarred',
                            type: 'success'
                        }
                        showMsg(msg)
                    }
                    this.email = email
                })

        },
    },

}