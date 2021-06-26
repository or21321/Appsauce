import { eventBus } from "../services/event-bus-service.js"


export default {
    template: `
        <div v-if="msg" class="user-msg" :class="msg.type">
            <button @click="closeMsg" class="close-msg">X</button>
            <span class="msg-icon" v-if="isSuccess" style="color: #dadadb;font-size: 24px;">✔</span>
            <span class="msg-icon" v-else>❌</span>
            <!-- <span v-if="isSuccess" style="color:rgb(37, 206, 37);font-size: 24px;">✔</span> -->
            <!-- cool? or nah? blah -->
            <div style="display:inline-block">
                <!-- <h4 v-if="isSuccess"></h4> -->
                <!-- <h4 v-if="isSuccess">SUCCESS!</h4> -->
                <!-- <h4 v-else>ERROR!</h4> -->
                <p>{{msg.txt}}</p>
                <router-link v-if="msg.link" :to="msg.link"><span @click="closeMsg">Check it out!</span></router-link>
            </div>
        </div>
    `,
    data() {
        return {
            msg: null,
            timeOut: null
        };
    },
    created() {
        eventBus.$on('show-msg', this.showMsg);
    },
    destroyed() {
        eventBus.$off('show-msg', this.showMsg);
    },
    methods: {
        showMsg(msg) {
            console.log('MSG');
            this.closeMsg()
            this.msg = msg;
            this.timeOut = setTimeout(() => {
                if (this.msg.link) this.$router.push('/email/inbox')
                this.msg = null;
                console.log('done');
            }, 4000);
        },
        closeMsg() {
            console.log('closeMsg()');
            clearTimeout(this.timeOut)
            this.timeOut = null
            this.msg = null
        },
        // goToBookPage() {
        // console.log('hey');
        // this.$router.push('/book/'+this.msg.bookId)
        // }
    },
    computed: {
        isSuccess() {
            // why it didnt work when i tried to do it without computed and manually on the v-if?
            return this.msg.type === 'success'
        }
    }
};