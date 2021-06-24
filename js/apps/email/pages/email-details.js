// import { emailService } from "../services/email-service.js"

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
        console.log('email-DETAILS CREATED!, email:', this.email);
    },
    destroyed() {
        console.log('email-DETAILS DESTROYED');
    },
    computed: {
        formatDate() {
            return new Date(this.email.sentAt).toLocaleDateString('he-il')
        }
    },
    watch: {
        '$route.params.email': {
            immediate: true,
            handler() {
                this.email = this.$route.params.email;
            },


        }
    },

}