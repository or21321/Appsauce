export default {
    template: `
    <div class="keep-compose">
        <input type="text" placeholder="Enter text here">    
        <section>
            <button>txt</button>
            <button>img</button>
            <button>todos</button>
            <button>video</button>
        </section>
        <section v-if="selected-type">according to type</section>
    </div>
    `
}