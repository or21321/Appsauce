import keepEdit from "./keep-edit.js"
import keepNotes from "./keep-notes.js"

export default {
    template: `
            <section>
                <header>
                    <appsauce-menu>Menu</appsauce-menu>
                    <input type="text" placeholder="search here...  ">
                    <div>LOGO</div>
                </header>
                <router-view></router-view>
            </section>
    `,
    data() {
        return {

        }
    },

    components:  {
        keepEdit,
        keepNotes
    }

}