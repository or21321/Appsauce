import homepage from "./pages/homepage.js"
import keepApp from "./apps/keep/pages/keep-app.js"
import emailApp from "./apps/email/pages/email-app.js"
import emailList from "./apps/email/cmps/email-list.js"
import emailDetails from "./apps/email/pages/email-details.js"

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
                path: ':emailId',
                component: emailDetails
            },
            // {   
            //     name: 'Details',
            //     path: ':emailId',
            //     component: emailDetails
            // },

        ]
    },
];

export const router = new VueRouter({ routes });