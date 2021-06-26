// import checking from '../pages/icon-imgs/best-email.png'

export default {
    template: `
        <div @click="toggleNavModal" class="app-nav">
            ☰
            <div v-if="isNavModalOpen" class="nav-modal">
                <div @click="$router.push('/email/inbox')" class="email">
                    <img src='./img/icons/best-email.png'>
                    <span>Email</span>
                </div>
                <div @click="$router.push('/keep')" class="keep">
                    <img src='./img/icons/keep.png'>
                    <span>Keep</span>
                </div>
                <div @click="goToBooksPage" class="book">
                    <img src='./img/icons/correct_book.png'>
                    <span>Book</span>
                </div>
                <!-- <div @click="$router.push('/email/inbox')" class="email">
                    <img src='../../img/icons/best-email.png' alt="https://cdn.icon-icons.com/icons2/2642/PNG/512/google_mail_gmail_logo_icon_159346.png">
                    <span>Email</span>
                </div>
                <div @click="$router.push('/keep')" class="keep">
                    <img src='../../img/icons/keep.png' alt="https://cdn.icon-icons.com/icons2/272/PNG/512/Keep_29993.png">
                    <span>Keep</span>
                </div>
                <div @click="goToBooksPage" class="book">
                    <img src='../../img/icons/correct_book.png' alt="https://cdn.icon-icons.com/icons2/272/PNG/512/Play_Books_30007.png">
                    <span>Book</span>
                </div> -->
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
        },
        goToBooksPage() {
            window.open("https://or21321.github.io/miss-book/#/book")
        }
    }
}