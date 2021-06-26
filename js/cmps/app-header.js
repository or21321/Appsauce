import emailFilter from '../apps/email/cmps/email-filter.js'
import { eventBus } from '../services/event-bus-service.js'
import noteFilter from '../apps/keep/cmps/note-filter.js'
// import nav from ''

export default {
    template: `
           <div class="email-header-container">
                <div class="email-header-logo" @click="goToHomepage">
                    <!-- Appsauce -->
                    <!-- <p> -->
                        <span style='color: #4285f4'>A</span>
                        <span style='color: #ea4335'>p</span>
                        <span style='color: #fbbc05'>p</span>
                        <span style='color: #4285f4'>s</span>
                        <span style='color: #34a853'>u</span>
                        <span style='color: #ea4335'>s</span>
                    <!-- </p> -->
                </div>
                <email-filter v-if="appFilter.email" />
                <note-filter v-if="appFilter.keep"/>
                <div class="email-nav">
                ☰
                    <!-- need to have nav comp here -->
                </div>
            </div>
    `,
    data() {
        return {
            appFilter: {
                email: false,
                keep: false
            }
        }
    },
    components: {
        emailFilter,
        noteFilter
    },
    created() {
        eventBus.$on('setAppFilter', this.setAppFilter)

    },
    methods: {
        goToHomepage() {
            // eventBus.$emit('loadEmails')
            this.$router.push('/')
        },
        setAppFilter(app) {
            console.log('setAppFilter, app', app);
            if (app === 'email') this.appFilter.email = true
            if (app === 'keep') this.appFilter.keep = true
        },
    },
    watch: {
        'this.$route': {
            immediate: true,
            handler() {
                console.log('from app-header, $route watcher');
            }
        }
    },
}