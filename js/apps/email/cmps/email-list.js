import emailPreview from "./email-preview.js"
import emailDetails from "../pages/email-details.js"
import { eventBus } from "../../../services/event-bus-service.js"
import { emailService } from "../services/email-service.js"

export default {
    template: `
        <!-- <div> -->
            <ul>
                <email-preview @remove="removeEmail" v-for="email in emailsToShow" :key="email.id" :email="email"></email-preview>
                <!-- <router-view></router-view> -->
            </ul>
        <!-- </div> -->
    `,
    data() {
        return {
            emails: [],
            filterBy: null
        }
    },
    components: {
        emailPreview,
        emailDetails
    },
    created() {
        console.log('email-LIST CREATED!, loadEmails()')
        this.loadEmails()
        eventBus.$on('filtered', this.filter)
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
            })
            return emailsToDisplay
        },
    },
    methods: {
        filter(filterBy) {
            console.log('from list, filterBy', filterBy);
            // is there a way to just set boolean value on the select? o.O
            if (filterBy.isRead === 'read') filterBy.isRead = true
            if (filterBy.isRead === 'unread') filterBy.isRead = false
            this.filterBy = filterBy
        },
        showEmailDetails() {
            console.log('showEmailDetails from book-list');
        },
        loadEmails() {
            emailService.query()
                .then(emails => {
                    this.emails = emails
                    console.log('from email-LIST, loadEmails returns:', emails);
                })
        },
        removeEmail(emailId) {
            console.log('deleting..', emailId);
            emailService.removeEmail(emailId)
                .then(() => {
                    this.loadEmails()
                })
        },
    },
    // watch: {
    //     '$route.params.emails': {
    //         immediate: true,
    //         handler() {
    //             this.emails = this.$route.params.emails;
    //             // if (!this.emails) this.$router.push('/emails')
    //             // if (!this.emails) eventBus.$emit('')
    //         },
    //     },
}
