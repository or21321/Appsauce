import { eventBus } from "../../../services/event-bus-service.js"
import { emailService } from "../services/email-service.js"

export default {
    template: `
    `,
    data() {
        return {
            emailsLength: null,
            readEmails: 0
        }
    },
    created() {
        console.log('email-STATUS CREATED!');
        eventBus.$on('updateEmailsStatus', this.updateEmailsStatus)
    },
    methods: {
        updateEmailsStatus() {
            emailService.query()
                .then(emails => {
                    this.emailsLength = emails.length
                    emails.forEach(email => {
                        if (email.isRead === 'read') ++this.readEmails
                    })
                })
        }
    },
    watch: {
        'readEmails': {
            immediate: true,
            handler() {
                console.log('STATUS WATCH, readEmails:', this.readEmails);
            }
        },
        'emailsLength': {
            immediate: true,
            handler() {
                console.log('STATUS WATCH, emailsLength', this.emailsLength);
            }
        }
    }
}