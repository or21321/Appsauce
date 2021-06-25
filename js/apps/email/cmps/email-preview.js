export default {
    props: ['email', 'isSentListOn'],
    template: `
        <div class="email-preview" @click="goToEmailDetails">
            <span v-if="!isSentListOn">From: {{email.sentBy}}</span>
            <span v-else>To: {{email.sendTo}}</span>
            <span>Subjet: {{email.subject}}</span>
            <!-- <span>{{email.body}}</span> -->
            <span>{{formatDate}}</span>
            <!-- <div class="email-body" v-if="showBody"> -->
                <!-- <p> -->
                    <!-- {{this.email.body}} -->
                    <!-- </p> -->
                <!-- </div> -->
                    <span class="delete-preview-btn material-icons" @click.stop="remove">delete</span>
            </div>
    `,
    data() {
        return {
            showBody: false,
            // sent: false
        }
    },
    created() {
        console.log('email-PREVIEW CREATED!, email:', this.email);
        console.log('from PREVIEW, isSentListOn', this.isSentListOn);
    },
    destroyed() {
        console.log('email-PREVIEW DESTROYED');
    },
    computed: {
        formatDate() {
            return new Date(this.email.sentAt).toLocaleDateString('he-il')
        },
    },
    methods: {
        goToEmailDetails() {
            this.$router.push('/email/details/' + this.email.id)
        },
        remove() {
            this.$emit('remove', this.email.id);
        },
    },
}