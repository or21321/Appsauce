import emailFilter from '../apps/email/cmps/email-filter.js'
import { eventBus } from '../services/event-bus-service.js'
import noteFilter from '../apps/keep/cmps/note-filter.js'
import appNav from './app-nav.js'

export default {
    template: `
           <div class="email-header-container">
                <button v-if="notHomepage" class="btn-menu" @click="toggleEmailFeaturesMenu">☰</button>
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
                <!-- <div class="email-nav">
                ☰ -->
                    <!-- need to have nav comp here -->
                <!-- </div> -->
                <!-- change class! -->
                <app-nav></app-nav>
            </div>
    `,
    data() {
        return {
            appFilter: {
                email: false,
                keep: false,
                notHompage: true
            }
        }
    },
    components: {
        emailFilter,
        noteFilter,
        appNav
    },
    created() {
        eventBus.$on('setAppFilter', this.setAppFilter)

    },
    methods: {
        toggleEmailFeaturesMenu() {
            eventBus.$emit('toggleEmailFeaturesMenu')
        },
        goToHomepage() {
            // eventBus.$emit('loadEmails')
            this.$router.push('/')
        },
        setAppFilter(app) {
            console.log('setAppFilter, app', app);
            if (app === 'email') {
                this.appFilter.email = true
                this.appFilter.keep = false
            } else if (app === 'keep') {
                this.appFilter.keep = true
                this.appFilter.email = false
            }
        },
    },
    watch: {
        '$route.path': {
            immediate: true,
            handler() {
                console.log('from app-header, $route watcher');
                if (this.$route.path === '/') {
                    this.appFilter.email = false
                    this.appFilter.keep = false
                    // this.notHompage = false
                }
                else {  
                    this.notHompage = true
                }
            }
        }
    },
}