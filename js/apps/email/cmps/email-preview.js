export default {
    props: ['email'],
    template: `
        <div class="email-preview" @click="showEmailDetails">
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
        console.log('email-PREVIEW CREATED!, email:', this.email);
    },
        destroyed() {
            console.log('email-PREVIEW DESTROYED');
        },
    computed: {
        formatDate() {
            return new Date(this.email.sentAt).toLocaleDateString('he-il')
        }
    },
    methods: {
        showEmailDetails() {
            this.$router.push({
                name: 'Details', params: {
                    email: this.email
                }
            })
        }
    },
}