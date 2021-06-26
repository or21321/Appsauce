export default {
    props: {
        percentage: Number,
        label: String,
    },
    template: `
        <div v-if="percentage" class="progress-bar">
            <div class="info" style="margin-left: 27px;">
                <label>{{label}}</label>
                <label class="percentage">{{percentage}}%</label>
            </div>
            <div class="background-bar"></div>
            <!-- If you are a metargel and watching this, please,
             help me understand that transition tag properly + why that didnt work so i had to get a watcher?
            might be due to scss?, styling from here works for now. -->
            <transition appear @before-appear="beforeEnter" @after-appear="enter">
                <div ref="bar" class="tracker-bar" style="height: 10px; background-color: lightslategrey"></div>
            </transition>
        </div>
    `,
    methods: {
        beforeEnter(el) {
            console.log('before enter');
            el.style.width = 0
        },
        enter(el) {
            console.log('enter', this.percentage);
            el.style.width = `${this.percentage}%`
            el.style.transition = `width 1s linear`
        }
    },
    watch: {
        'percentage': {
            immediate: true,
            handler() {
                this.enter(this.$refs.bar)
            }
        }
    }
}