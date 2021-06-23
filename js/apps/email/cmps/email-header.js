import emailFilter from './email-filter.js'
// import nav from ''

export default {
    template: `
           <div class="email-header-container">
                <div class="email-header-logo">
                </div>
                <email-filter>
                <!-- need to bring here with input/filter option -->
                </email-filter>
                <div class="email-nav">
                    =
                    <!-- need to have nav comp here -->
                </div>
            </div>
    `,
    components: {
        emailFilter,
    }
}