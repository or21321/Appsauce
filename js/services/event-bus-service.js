export const eventBus = new Vue()
export function showMsg(msg) {
    console.log('from eventBus showMsg(msg)');
    eventBus.$emit('show-msg', msg)
}