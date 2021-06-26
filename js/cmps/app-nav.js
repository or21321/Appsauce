// import checking from '../pages/icon-imgs/best-email.png'

import { eventBus } from "../services/event-bus-service.js";
import { showMsg } from "../services/event-bus-service.js";

export default {
    template: `
        <div @click="toggleNavModal" class="app-nav">
            ☰
            <div v-if="isNavModalOpen" class="nav-modal">
                <div @click="$router.push('/email/inbox')" class="nav-icon">
                    <img src='./img/icons/nav-icons/email.png'>
                    <span>Email</span>
                </div>
                <div @click="$router.push('/keep')" class="nav-icon">
                    <img src='./img/icons/nav-icons/keep.png'>
                    <span>Keep</span>
                </div>
                <div @click="goToBooksPage" class="nav-icon">
                    <img src='./img/icons/nav-icons/book.png'>
                    <span>Book</span>
                </div>
                <div @click="goToGoogleMaps" class="nav-icon">
                    <img src='./img/icons/nav-icons/maps.png'>
                    <span>Maps</span>
                </div>
                <div @click="goToYoutube" class="nav-icon">
                    <img src='./img/icons/nav-icons/youtube.png'>
                    <span>Youtube</span>
                </div>
                <div @click="showErrMsg('Play')" class="nav-icon">
                    <img src='./img/icons/nav-icons/play.png'>
                    <span>Play</span>
                </div>
                <div @click="showErrMsg('Account Managment')" class="nav-icon">
                    <img src='./img/icons/nav-icons/account.png'>
                    <span>Account</span>
                </div>
                <div @click="showErrMsg('Search')" class="nav-icon">
                    <img src='./img/icons/nav-icons/search.png'>
                    <span>Search</span>
                </div>
                <div @click="goToGoogleCalendar" class="nav-icon">
                    <img src='./img/icons/nav-icons/calendar.png'>
                    <span>Calendar</span>
                </div>
                <div @click="showErrMsg('Meet')" class="nav-icon">
                    <img src='./img/icons/nav-icons/meet.png'>
                    <span>Meet</span>
                </div>
                <div @click="goToGoogleNews" class="nav-icon">
                    <img src='./img/icons/nav-icons/news.png'>
                    <span>News</span>
                </div>
                <div @click="showErrMsg('Drive')" class="nav-icon">
                    <img src='./img/icons/nav-icons/drive.png'>
                    <span>Drive</span>
                </div>
                <div @click="showErrMsg('Contacts')" class="nav-icon">
                    <img src='./img/icons/nav-icons/contacts.png'>
                    <span>Contacts</span>
                </div>
                <div @click="showErrMsg('Photos')" class="nav-icon">
                    <img src='./img/icons/nav-icons/photos.png'>
                    <span>Photos</span> 
                </div>
                <div @click="showErrMsg('Translate')" class="nav-icon">
                    <img src='./img/icons/nav-icons/translate.png'>
                    <span>Translate</span>
                </div>
                <div @click="showErrMsg('Chat')" class="nav-icon">
                    <img src='./img/icons/nav-icons/chat.png'>
                    <span>Chat</span>
                </div>
                <div @click="showErrMsg('Duo')" class="nav-icon">
                    <img src='./img/icons/nav-icons/duo.png'>
                    <span>Duo</span>
                 </div>
                <div @click="showErrMsg('Earth')" class="nav-icon">
                    <img src='./img/icons/nav-icons/earth.png'>
                    <span>Earth</span>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            isNavModalOpen: false
        }
    },
    created() {
        eventBus.$on('showNav-Menu', this.toggleNavModal)
    },
    methods: {
        toggleNavModal() {
            console.log('WTF');
            this.isNavModalOpen = !this.isNavModalOpen
            console.log('isNavModalOpen', this.isNavModalOpen);
        },
        goToBooksPage() {
            window.open("https://or21321.github.io/miss-book/#/book")
        },
        goToYoutube() {
            window.open("https://youtube.com")
        },
        goToGoogleMaps() {
            window.open("https://www.google.com/maps")
        },
        goToGoogleCalendar() {
            window.open("https://calendar.google.com/calendar")
        },
        goToGooglePlay() {
            window.open("https://play.google.com/store/apps")
        },
        goToGoogleNews() {
            window.open("https://news.google.com/")
        },
        showErrMsg(app) {
            const msg = {
                txt: `Im sorry.. ${app} is under maintenance at the moment`,
                type: 'error'
            }
            showMsg(msg)
        }
    }
}