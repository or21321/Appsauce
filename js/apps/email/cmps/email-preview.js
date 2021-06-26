import { eventBus } from "../../../services/event-bus-service.js";
import longText from "./long-text.js"

export default {
    props: ['email', 'isSentListOn'],
    template: `
        <div class="email-preview" @click="goToEmailDetails" :class="{ starred: email.isStarred }">
            <span v-if="!isSentListOn">{{email.sentBy}}</span>
            <span v-else>To: {{email.sendTo}}</span>
            <span>{{email.subject}}</span>
            <long-text :textToFormat="email.body"></long-text>
            <span>{{formatDate}}</span>
            <!-- <div class="email-body" v-if="showBody"> -->
                <!-- <p> -->
                    <!-- {{this.email.body}} -->
                    <!-- </p> -->
                <!-- </div> -->
                <div>

                    <!-- <span class="delete-preview-btn material-icons" @click.stop="remove"></span> -->
                    <span class="delete-preview-btn material-icons" @click.stop="remove">delete</span>
                    <div class="">
                        <div class="icon" @click.stop="toggleEmailStarred">
                            <span v-if="email.isStarred" class="material-icons" style="font-size: 22px; color:#f7cb4d">star</span>
                            <span v-else class="material-icons" style="font-size: 22px">star_border</span>
                            <span v-if="email.isStarred" class="tooltip-text" style="font-size: 14px">Starred</span>
                            <span v-else class="tooltip-text" style="font-size: 14px">Not starred</span>
                        </div>
                        <div class="icon" @click.stop="replyToEmail">
                            <span class="material-icons" style="font-size: 22px">reply</span>
                            <span class="tooltip-text">Reply</span>
                        </div>
                    </div>
                </div>
            </div>
    `,
    data() {
        return {
            showBody: false,
            // sent: false
        }
    },
    components: {
        longText
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
        // bodyTo() {
        //     let description = this.book.description
        //     description = description.split(' ')

        //     if (this.showMoreDesc || description.length <= 10) return this.book.description

        //     description = description.splice(0, 10)

        //     const descriptionToShow = description.join(' ')
        //     return descriptionToShow + '...'
        // },
    },
    methods: {
        goToEmailDetails() {
            this.$router.push('/email/details/' + this.email.id)
        },
        remove() {
            this.$emit('remove', this.email.id);
        },
        toggleEmailStarred() {
            eventBus.$emit('toggleEmailStarred', this.email.id)
            this.email.isStarred = !this.email.isStarred
        },
        replyToEmail() {
            console.log('replyToEmail()');
            this.$router.push('/email/details/' + this.email.id)
        }
    },
}