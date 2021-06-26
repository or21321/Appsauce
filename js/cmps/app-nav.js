export default {
    template: `
        <div @click="toggleNavModal" class="app-nav">
            ☰
            <div v-if="isNavModalOpen" class="nav-modal">
                <div @click="$router.push('/email/inbox')" class="email">
                    <img src='../../img/icons/best-email.png'>
                    <span>Email</span>
                </div>
                <div @click="$router.push('/keep')" class="keep">
                    <img src='../../img/icons/keep.png'>
                    <span>Keep</span>
                </div>
                <div @click="$router.push('/keep')" class="keep">
                    <img src='../../img/icons/keep.png'>
                    <span>Keep</span>
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