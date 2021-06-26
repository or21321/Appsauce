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

            // if (this.filterBy.priceMax === '') this.filterBy.priceMax = Infinity
            // if (this.filterBy.priceMin === '') this.filterBy.priceMin = 0

            const emailsToDisplay = this.emails.filter(email => {
                return (
                    // a shorter way?

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
                // if (this.isStarredList) return this.
            })
            console.log('emailstoDisplay', emailsToDisplay);
            return emailsToDisplay
        },
    },
    methods: {
        filter(filterBy) {
            console.log('from list, filterBy', filterBy);
            // is there a way to just set boolean value on the select? o.O
            if (!filterBy.isRead) filterBy.isRead = 'all'
            this.filterBy = filterBy
            // if (filterBy.isRead === 'read') this.filterBy.isRead = 'read'
            // if (filterBy.isRead === 'unread') this.filterBy.isRead = 'unread'
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
                    // this.$router.push('/email/inbox')
                })
        },
        filterListByStarred(emails) {
            console.log('filtering by starred');
            return emails.filter(email => {
                return email.isStarred
            })
        },
        removeEmail(emailId) {
            console.log('deleting..', emailId);
            emailService.removeEmail(emailId)
                .then(() => {
                    this.loadEmails()
                    const msg = {
                        txt: 'Email deleted!',
                        type: 'success'
                    }
                    showMsg(msg)
                    eventBus.$emit('emailRemoved')
                })
        },
        toggleEmailStarred(emailId) {
            // console.log('markAsStar');
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
                // ?Corret way, or should i make it different comps, or send param instead?
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
                // if (this.$route.path === '/email/inbox/starred') {
                //     console.log('STARRED');
                //     this.isStarredList = true
                //     this.loadEmails()
                // }
                // else if (this.$route.path === 'email/inbox/sent') {
                //     this.isStarredList = false
                //     console.log('emailService.loadSentEmails()');
                // }
                // else {
                //     console.log('LIST');
                //     this.isStarredList = false
                //     this.loadEmails()
                // }
                // if (!this.emails) this.$router.push('/emails')
                // if (!this.emails) eventBus.$emit('')
            },
        },
    }
}
