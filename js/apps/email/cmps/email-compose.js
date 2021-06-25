import { emailService } from "../services/email-service.js";
import { showMsg } from "../../../services/event-bus-service.js";

export default {
    template: `
      <section v-if="emailToEdit" class="email-compose">
        <form @submit.prevent="sendEmail">
            <!-- <label>Vendor:</label> -->
            <input v-model="emailToEdit.sendTo" type="text" placeholder="Recipients">
            <!-- <label>Max Speed:</label> -->
            <input v-model="emailToEdit.subject" type="text" placeholder="Subject">
            <textarea v-model="emailToEdit.body" placeholder="Body" cols="30" rows="10"></textarea>
            <button>Send</button>
        </form>
        <!-- <pre>{{carToEdit}}</pre> -->
    </section>
    `,
    data() {
        return {
            emailToEdit: null
        }
    },
    created() {
        console.log('email-COMPOSE CREATED!');
    },
    watch: {
        'this.$route.params.emailId': {
            immediate: true,
            handler() {
                const { emailId } = this.$route.params;
                if (emailId) {
                    console.log('REPLY');
                    // REPLY
                    emailService.getById(emailId)
                        .then(email => {
                            this.emailToEdit = email
                            // better way?
                            this.emailToEdit.sendTo = 'Re: ' + email.sentBy
                            this.emailToEdit.subject = 'Subject: ' + this.emailToEdit.subject
                        });
                } else {
                    console.log('COMPOSE');
                    // COMPOSE
                    this.emailToEdit = emailService.getEmptyEmail();
                    console.log('emailToEdit = getEmptyEmail(), returns:', this.emailToEdit);
                    // MAKE
                }
            }
        },
    },
    // computed: {
    //     title() {
    //         return this.$route.params.carId ? 'Car Edit' : 'Car Add';
    //     }
    // },
    methods: {
        sendEmail() {
            console.log('sendEmail()', this.emailToEdit);
            emailService.sendEmail(this.emailToEdit)
                .then(sentEmail => {
                    const msg = {    
                        txt: 'Email sent!',
                        type: 'success',
                        link: `/email/details/${sentEmail.id}`
                    }
                    showMsg(msg)
                    // setTimeout(() => {
                    //     this.$router.push('/email/inbox')
                    // }, 4000)
                })
        },
    }
}