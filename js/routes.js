import homepage from "./pages/homepage.js"
import keepApp from "./apps/keep/pages/keep-app.js"
import emailApp from "./apps/email/pages/email-app.js"
import emailList from "./apps/email/cmps/email-list.js"
import emailDetails from "./apps/email/pages/email-details.js"
import emailCompose from "./apps/email/cmps/email-compose.js"

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
        path: '/email',
        component: emailApp,
        children: [
            {
                name: 'Inbox',
                path: 'inbox',
                component: emailList,
                // props: ['emails'],
            },

            {
                name: 'Details',
                path: 'details/:emailId',
                component: emailDetails
            },
            {   
                name: 'Compose',
                // id like to understand how this works better.
                path: 'compose/:emailId?',
                component: emailCompose
            },

        ]
    },
];

export const router = new VueRouter({ routes });