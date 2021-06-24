import { router } from "../js/routes.js"
import appHeader from "./cmps/app-header.js"
import homepage from "./pages/homepage.js"
// import appFooter from "./cmps/app-footer.js"

const options = {
    el: '#app',
    router,
    template: `
        <section class="vue-app">
            <app-header />
            <router-view></router-view>
            <!-- <app-footer /> -->
        </section>
    `,
    components: {
        homepage,
        appHeader,
        // appFooter
        // dont need this here
        // keepApp,
        // emailApp
    },
};

const app = new Vue(options);