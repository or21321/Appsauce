import { storageService } from "../../../services/async-storage-service.js"
import { utilService } from "../../../services/util-service.js"

const EMAILS_KEY = 'emails'

export const emailService = {
    query,
    getById,
    getEmptyEmail,
    sendEmail,
    removeEmail,
    toggleEmailStarred,
    save,
    querySentEmails
}


// ? opinion on this ?
function query() {
    return storageService.query(EMAILS_KEY)
        .then((emails) => {
            if (!emails || !emails.length) {
                console.log('query() returns _createEmails');
                emails = _createEmails()
            }
            utilService.saveToStorage(EMAILS_KEY, emails);
            return emails
        })
}

function querySentEmails() {
    return storageService.query('sentEmails')
        .then(emails => {
            if (!emails || !emails.length) {
                return Promise.reject({ txt: 'Dont have any sent emails', type: 'error' })
            }
            // utilService.saveToStorage('sentEmails', emails)
            return emails
        })
}

function getEmptyEmail() {
    return {
        sentBy: '', subject: '', body: '', sendTo: '', isRead: 'unread'
        // sentBy should be added on compose
        // also isRead: false, sentAt, and Id
    }
}

function sendEmail(email) {
    console.log('from service', email);
    const emailToSend = email
    // emailToSend.id = utilService.makeId()
    emailToSend.sentBy = 'Loki'
    emailToSend.sentAt = Date.now()
    // should send the email here if it was a real scenario
    return save(emailToSend)
        .then(sentEmail => {
            sentEmail.sentBy = 'Me'
            return storageService.post('sentEmails', sentEmail);
        })
    // saveSentEmail(emailToSend)
}

// function saveSentEmail(sentEmail) {
//     if (email.id) {
//         return storageService.put(EMAILS_KEY, email);
//     } else {
//         return storageService.post(EMAILS_KEY, email);
//     }
// }

function toggleEmailStarred(emailId) {
    return getById(emailId)
        .then((email) => {
            email.isStarred = !email.isStarred
            console.log('email.isStarred', email.isStarred);
            return save(email)
        })
}

function _createEmails() {
    return [
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        {
            sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
            isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        {
            sentBy: 'GitGuardian', body: `GitGuardian security \n\n\n alertGitGuardian has detected the following Google API Key exposed within your GitHub account \n\n .Details- Secret type: \n Google API Key- Repository: or21321/miss-book- Pushed date: June 22nd 2021, 19:09:14 UTC Stay safe on GitHubKeep your protection active by logging in with your GitHub account:Protect Your GitHub ReposRead our guide to remediate an exposed secret. \n\nGitGuardian is an automated secrets detection service trusted by 150,000 developers worldwide.GitGuardian-badge`,
            subject: 'Oops i did it again', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
        },
        { sentBy: 'Farem', subject: 'Another ad', body: 'Buy me!', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        { sentBy: 'Tinder', subject: 'We will help you', body: 'Buy me!', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
        { sentBy: 'okCupid', subject: 'We will help you more', body: 'Buy me!', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, }
    ]

}
// function _createEmails() {
//     return [
//         { sentBy: 'Tomer', subject: 'Wassap?', body: 'Or! i have been looking to to have a talk with you! \n \n its not super urgent but please call me when you can !', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
//         {
//             sentBy: 'Mary', subject: 'Ad..', body: 'Hello again my dear \n\n\n I am now contacting you for the third time since my first email to you, on June, 5th 2021. \n\n I must admit that Im surprised you still havent given me an answer...Or your forecast for the next three months Or, is here, and you need to take advantage of it RIGHT NOW! \n\n This is your chance to receive guidance about your future opportunities.Ever since my first e- mail, Ive been trying to tell you about the amazing configurations happening in your sky and the opportunities that await you.So many positive changes in your love life, professional life, different projects and more are awaiting you ...With your approval, I can help you benefit from all of these configurations, but ONLY if you give me your green light.Think carefully about the decision you will make. \n\nPersonally, I think it would be a massive shame if you missed out on this: I cannot stress this enough - your life truly depends on it! Dont worry Or, it is all still available for you on your personal page I created for you.',
//             isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
//         },
//         {
//             sentBy: 'GitGuardian', body: `GitGuardian security \n\n\n alertGitGuardian has detected the following Google API Key exposed within your GitHub account \n\n .Details- Secret type: \n Google API Key- Repository: or21321/miss-book- Pushed date: June 22nd 2021, 19:09:14 UTC Stay safe on GitHubKeep your protection active by logging in with your GitHub account:Protect Your GitHub ReposRead our guide to remediate an exposed secret. \n\nGitGuardian is an automated secrets detection service trusted by 150,000 developers worldwide.GitGuardian-badge`,
//             subject: 'Oops i did it again', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,
//         },
//         { sentBy: 'Farem', subject: 'Another ad', body: 'Buy me!', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
//         { sentBy: 'Tinder', subject: 'We will help you', body: 'Buy me!', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, },
//         { sentBy: 'okCupid', subject: 'We will help you more', body: 'Buy me!', isRead: 'unread', sentAt: 1551133930594, id: utilService.makeId(), isStarred: false, }
//     ]

// }

function removeEmail(emailId) {
    return storageService.remove(EMAILS_KEY, emailId);
}

function save(email) {
    if (email.id) {
        return storageService.put(EMAILS_KEY, email);
    } else {
        return storageService.post(EMAILS_KEY, email);
    }
}

function getById(emailId, key = EMAILS_KEY) {
    return storageService.get(key, emailId);
}
// function getNegsBooksId(bookId) {
//     return query()
//         .then(books => {
//             const idx  = books.findIndex(book => book.id === bookId)
//             return (idx === books.length-1)? books[0].id :  {next: books[idx+1].id, previous: books[idx-1].id}
//         })
// }

// function addGoogleBook(googleBook) {
//     console.log('from service', googleBook);
//     const newBook = {
//         "id": null,
//         "title": googleBook.volumeInfo.title,
//         "subtitle": "mi est eros convallis auctor arcu dapibus himenaeos",
//         "authors": googleBook.volumeInfo.authors,
//         "publishedDate": googleBook.volumeInfo.publishedDate,
//         "description":  googleBook.volumeInfo.description,
//         "pageCount": googleBook.volumeInfo.pageCount,
//         "categories": googleBook.volumeInfo.categories,
//         "thumbnail": googleBook.volumeInfo.imageLinks.thumbnail,
//         "language": googleBook.volumeInfo.language,
//         "listPrice": {
//             "amount": utilService.getRandomInt(15, 190),
//             "currencyCode": "ILS",
//             "isOnSale": false
//         }
//     }
//     console.log('saving newBook', newBook);
//     return save(newBook)
// }


// function remove(bookId) {
//     return storageService.remove(BOOKS_KEY, bookId);
// }




