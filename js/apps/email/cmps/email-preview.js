export default {
    props: ['email'],
    template: `
        <div class="email-preview" @click="emailClicked">
            <span>From: {{email.sentBy}}</span>
            <span>Subjet: {{email.subject}}</span>
            <!-- <span>{{email.body}}</span> -->
            <span>{{formatDate}}</span>
            <div class="email-body" v-if="showBody">
                <!-- <p> -->
                    {{this.email.body}}
                    <!-- </p> -->
                </div>
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
        emailClicked() {
            console.log('this.email.body:', this.email.body);
            console.log('this.showBody', this.showBody);
            this.showBody = !this.showBody
        }
    },
}