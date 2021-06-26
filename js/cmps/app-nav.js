export default {
    template: `
        <div @click="toggleNavModal" class="app-nav">
            ☰
            <div v-if="isNavModalOpen" class="nav-modal">
                <div @click="$router.push('/email/inbox')" class="email">
                    <!-- <span class="material-icons">mail</span> -->
                    <img src='../../img/icons/best-email.png'>
                    <span>Email</span>
                    <!-- <img src='../../img/icons/email.png'> -->
                </div>
                <div @click="$router.push('/keep')" class="keep">
                    <img src='../../img/icons/keep.png'>
                    <span>Keep</span>
                    <!-- <span class="material-icons">note</span> -->
                </div>
            </div>
        </div>
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