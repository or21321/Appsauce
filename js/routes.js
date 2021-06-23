import homepage from "./pages/homepage.js"
import keepApp from "./apps/keep/pages/keep-app.js"
import mailApp from "./apps/email/pages/email-app.js"

const routes = [
    {
        path: '/',
        component: homepage
    },
    {   
        path: '/keep',
        component: keepApp
    },
    {   
        path: '/mail',
        component: mailApp
    },
];

export const router = new VueRouter({ routes });