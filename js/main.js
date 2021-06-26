import { router } from "../js/routes.js"
import appHeader from "./cmps/app-header.js"
import homepage from "./pages/homepage.js"
import userMsg from "./cmps/user-msg.js"


const options = {
    el: '#app',
    router,
    template: `
        <section class="vue-app">
            <user-msg></user-msg>
            <app-header />
            <router-view></router-view>
        </section>
    `,
    components: {
        appHeader,
        userMsg
    },
};

const app = new Vue(options);