import emailFilter from './email-filter.js'
// import nav from ''

export default {
    template: `
           <div class="email-header-container">
                <div class="email-header-logo">
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
                <email-filter>
                <!-- need to bring here with input/filter option -->
                </email-filter>
                <div class="email-nav">
                ☰
                    <!-- need to have nav comp here -->
                </div>
            </div>
    `,
    components: {
        emailFilter,
    }
}