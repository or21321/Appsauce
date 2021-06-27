export const eventBus = new Vue()

export function showMsg(msg) {
    console.log('from eventBus showMsg(msg)');
    eventBus.$emit('show-msg', msg)
}

export function updateEmailsStatus() {
    console.log('updateEmailsStatus()');
    eventBus.$emit('updateEmailsStatus')
}

export function showNavManu() {
    console.log('from eventBus, showNavMenu()');
    eventBus.$emit('showNav-Menu')
}

export function setInboxSize(size) {    
    console.log('from eventBus, setInboxSize()');
    eventBus.$emit('setInbox-Size', size)
}