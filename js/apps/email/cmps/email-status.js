import { eventBus } from "../../../services/event-bus-service.js"
import { emailService } from "../services/email-service.js"
import progressBar from "./progress-bar.js"
import { setInboxSize } from "../../../services/event-bus-service.js"

export default {
    // props: {
    //     percentage: Number,
    //     label: String,
    // },
    components: {
        progressBar
    },
    template: `
    <section>
        <progress-bar :percentage="readEmailsPercentage" :label="'Read -'"></progress-bar>
    </section>
  `,
    data() {
        return {
            emailsLength: 0,
            readEmails: 0,
            // readEmailsPercentage: 100
        }
    },
    created() {
        console.log('email-STATUS CREATED!');
        eventBus.$on('updateEmailsStatus', this.updateEmailsStatus)
    },
    computed: {
        readEmailsPercentage() {
            if (!this.emailsLength || !this.readEmails) return 0
            return Math.floor((this.readEmails / this.emailsLength) * 100)
        }
    },
    methods: {
        updateEmailsStatus() {
            // this.readEmails = 0
            // this.emailsLength = 0
            emailService.query()
                .then(emails => {
                    let readEmailsCount = 0
                    this.emailsLength = emails.length
                    emails.forEach(email => {
                        if (email.isRead === 'read') ++readEmailsCount
                        if (readEmailsCount > this.readEmails) this.readEmails = readEmailsCount
                    })
                })
        },
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
                if (this.emailsLength) setInboxSize(this.emailsLength)
            }
        }
    }
}