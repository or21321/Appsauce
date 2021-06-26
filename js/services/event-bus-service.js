export const eventBus = new Vue()

export function showMsg(msg) {
    console.log('from eventBus showMsg(msg)');
    eventBus.$emit('show-msg', msg)
}

export function updateEmailsStatus() {
    console.log('from eventBus updateEmailsStatus()');
    eventBus.$emit('updateEmailsStatus')
}