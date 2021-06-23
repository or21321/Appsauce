import { eventBus } from "../../../services/event-bus-service.js"

export default {
    props: ['email'],
    template: `
        <div class="email-preview" @click="showEmail">
            <span>From: {{email.sentBy}}</span>
            <span>Subjet: {{email.subject}}</span>
            <!-- <span>{{email.body}}</span> -->
            <span>{{formatDate}}</span>
            <!-- <div class="email-body" v-if="showBody"> -->
                <!-- <p> -->
                    <!-- {{this.email.body}} -->
                    <!-- </p> -->
                <!-- </div> -->
            </div>
    `,
    data() {
        return {    
            showBody: false
        }
    },
    created() {
        console.log('email-preview created, email:', this.email);
    },
    computed: {
        formatDate() {
            return new Date(this.email.sentAt).toLocaleDateString('he-il')
        }
    },
    methods: {
        showEmail() {
            console.log('this.email.id:', this.email.id);
            // console.log('this.showBody', this.showBody);
            // this.showBody = !this.showBody
                eventBus.$emit('emailSelected')
                this.$router.push('/email/inbox/'+this.email.id)
        }
    },
}