import { eventBus } from "../../../services/event-bus-service.js"
import { emailService } from "../services/email-service.js"

export default {
    props: {
        percentage: Number,
        label: String,
    },
    template: `
    <div class="progress-bar">
      <div class="info">
        <label>{{label}}</label>
        <label class="percentage">{{percentage}}%   </label>
      </div>
      <div class="background-bar"></div>
      <transition appear @before-appear="beforeEnter" @after-appear="enter">
        <div class="tracker-bar"></div>
      </transition>
   </div>
  </div>
  `,
    methods: {
    }
    ,
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
        },
        beforeEnter(el) {
            console.log('before enter');
            el.style.width = 0
        },
        enter(el) {
            console.log('enter', this.percentage);
            el.style.width = `${this.percentage}%`
            el.style.transition = `width 1s linear`
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