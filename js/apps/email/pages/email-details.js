import { emailService } from "../services/email-service.js"

export default {
    template: `
        <div v-if="email" class="email-details">
            <h2>{{email.subject}}</h2>
            <p>{{email.body}}</p>
            <p>{{email.sentBy}}</p>
            <p>{{formatDate}}</p>
        </div>
    `,
    data() {
        return {
            email: null,

        }
    },
    created() {
        // get id from route and use
        const { emailId } = this.$route.params;
        console.log('emailId from params', emailId);
        emailService.getById(emailId)
            .then(email => this.email = email);
    },
    computed: {
        formatDate() {
            return new Date(this.email.sentAt).toLocaleDateString('he-il')
        }
    },
    watch: {
        '$route.params.emailId': {
            immediate: true,
            handler() {
                console.log('$route.params.emailId handler');
                const { emailId } = this.$route.params;
                console.log('what', emailId);
                // booksService.getById(emailId)
                //     .then(email => this.email = email);
                // booksService.getNegsBooksId(emailId)
                //     .then(emailId => {
                //         this.nextEmailId = emailId.next
                //         this.previousEmailId = emailId.previous

                //     })
            },


        }
    },

}