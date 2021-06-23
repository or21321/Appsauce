import homepage from "./pages/homepage.js"
import keepApp from "./apps/keep/pages/keep-app.js"
import emailApp from "./apps/email/pages/email-app.js";
import { router } from "./routes.js"

const options = {
    el: '#app',
    router,
    components: {
        homepage,
        // dont need this here
        // keepApp,
        // emailApp
    },
    template: `
        <!-- <section class="vue-app"> -->
            <!-- <user-msg></user-msg> -->
            <!-- <app-header /> -->
            <router-view></router-view>
            <!-- <app-footer /> -->
        <!-- </section> -->
    `,
};

const app = new Vue(options);