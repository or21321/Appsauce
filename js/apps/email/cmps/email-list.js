import emailPreview from "./email-preview.js"
import emailDetails from "../pages/email-details.js"
import { eventBus } from "../../../services/event-bus-service.js"
import { showMsg } from "../../../services/event-bus-service.js"
import { emailService } from "../services/email-service.js"
import { updateEmailsStatus } from "../../../services/event-bus-service.js"

export default {
    template: `
        <!-- <div> -->
            <ul>
                <email-preview @remove="removeEmail" v-for="email in emailsToShow" :key="email.id" :email="email" :isSentListOn="isSentList"></email-preview>
                <!-- <router-view></router-view> -->
            </ul>
        <!-- </div> -->
    `,
    data() {
        return {
            emails: [],
            filterBy: null,
            isStarredList: false,
            isSentList: false
        }
    },
    components: {
        emailPreview,
        emailDetails
    },
    created() {
        console.log('email-LIST CREATED!, loadEmails()')
        // this.loadEmails()
        eventBus.$on('filtered', this.filter)
        eventBus.$on('toggleEmailStarred', this.toggleEmailStarred)
    },
    destroyed() {
        console.log('email-LIST DESTROYED');
    },
    computed: {
        emailsToShow() {
            if (!this.filterBy) return this.emails

            const emailsToDisplay = this.emails.filter(email => {
                return (

                    email.sentBy.toLowerCase().includes(this.filterBy.txt.toLowerCase()) &&
                    this.filterBy.isRead === 'all' ||

                    email.subject.toLowerCase().includes(this.filterBy.txt.toLowerCase()) &&
                    this.filterBy.isRead === 'all' ||

                    email.sentBy.toLowerCase().includes(this.filterBy.txt.toLowerCase()) &&
                    email.isRead === this.filterBy.isRead ||

                    email.subject.toLowerCase().includes(this.filterBy.txt.toLowerCase()) &&
                    email.isRead === this.filterBy.isRead ||

                    new Date(email.sentAt).toLocaleDateString('he-il').includes(this.filterBy.txt.toLowerCase()) &&
                    this.filterBy.isRead === 'all' ||

                    new Date(email.sentAt).toLocaleDateString('he-il').includes(this.filterBy.txt.toLowerCase()) &&
                    email.isRead === this.filterBy.isRead
                )
            })
            console.log('emailstoDisplay', emailsToDisplay);
            return emailsToDisplay
        },
    },
    methods: {
        filter(filterBy) {
            console.log('from list, filterBy', filterBy);
            if (!filterBy.isRead) filterBy.isRead = 'all'
            this.filterBy = filterBy
        },
        showEmailDetails() {
            console.log('showEmailDetails from book-list');
        },
        loadEmails() {
            emailService.query()
                .then(emails => {
                    if (this.isStarredList) emails = this.filterListByStarred(emails)

                    if (!emails || emails.length === 0) {
                        const msg = {
                            txt: 'Dont have any starred emails',
                            type: 'error'
                        }
                        this.$router.push('/email/inbox')
                        return showMsg(msg)
                    }
                    this.emails = emails
                    console.log('from email-LIST, loadEmails returns:', emails);
                    if (this.$route.path === '/email/inbox') this.$emit('inboxSize', emails.length)
                    updateEmailsStatus()
                })
        },
        loadSentEmails() {
            emailService.querySentEmails()
                .then(emails => {
                    this.isSentList = true
                    this.emails = emails
                    console.log('from email-LIST, loadSentEmails returns:', emails);
                })
                .catch(err => {
                    console.log(err);
                    showMsg(err)
                })
        },
        filterListByStarred(emails) {
            console.log('filtering by starred');
            return emails.filter(email => {
                return email.isStarred
            })
        },
        removeEmail(emailId) {
            if (this.$route.path === '/email/inbox/sent') return
            console.log('deleting..', emailId);
            emailService.removeEmail(emailId)
                .then(() => {
                    this.loadEmails()
                    const msg = {
                        txt: 'Email deleted!',
                        type: 'success'
                    }
                    updateEmailsStatus()
                    showMsg(msg)
                })
        },
        toggleEmailStarred(emailId) {
            emailService.toggleEmailStarred(emailId)
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
        }
    },
    watch: {
        '$route': {
            immediate: true,
            handler() {
                console.log('this.$route.path, from list', this.$route.path);
                switch (this.$route.path) {
                    case '/email/inbox':
                        console.log('LIST');
                        this.isSentList = false
                        this.isStarredList = false
                        this.loadEmails()
                        break
                    case '/email/inbox/starred':
                        console.log('STARRED');
                        this.isSentList = false
                        this.isStarredList = true
                        this.loadEmails()
                        break
                    case '/email/inbox/sent':
                        console.log('SENT');
                        this.isStarredList = false
                        this.loadSentEmails()
                        break
                }
            },
        },
    }
}
