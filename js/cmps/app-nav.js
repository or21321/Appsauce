export default {
    template: `
    <section>
        <div @click="toggleNavModal" class="app-nav">
            ☰
            <div v-if="isNavModalOpen" class="nav-modal">
                <div @click="$router.push('/email/inbox')" class="email">
                    <!-- <span class="material-icons">mail</span> -->
                    <img src='../../img/icons/best-email.png'>
                    <span>email</span>
                    <!-- <img src='../../img/icons/email.png'> -->
                </div>
                <div @click="$router.push('/keep')" class="keep">
                    <img src='../../img/icons/keep.png'>
                    <span>keep</span>
                    <!-- <span class="material-icons">note</span> -->
                </div>
            </div>
        </div>
    </section>
    `,
    data() {
        return {
            isNavModalOpen: false
        }
    },
    methods: {
        toggleNavModal() {
            console.log('WTF');
            this.isNavModalOpen = !this.isNavModalOpen
            console.log('isNavModalOpen', this.isNavModalOpen);
        }
    }
}