export default {
    template: `
        <section class="homepage">
            <div class="header">
                <h1>HEADER</h1>
            </div>
            <div class="main">
                <h2>Home-Page</h2>
                <!-- router links -->
                <router-link to="/keep">Keep</router-link>
                <router-link to="/email/inbox">Email</router-link>
            </div>
            <div class="footer">
                <span>Cofferights</span>
            </div>
        </section>
    `,
    data() {
        return {

        }
    },

}