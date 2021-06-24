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
    save
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

function getEmptyEmail() {
    return {
        sentBy: '', subject: '', body: '', sendTo: ''
        // sentBy should be added on compose
        // also isRead: false, sentAt, and Id
    }
}

function sendEmail(email) {
    console.log('from service', email);
    const emailToSend = email
    // emailToSend.id = utilService.makeId()
    emailToSend.sentBy = 'Loki'
    emailToSend.isRead = false
    emailToSend.sentAt = Date.now()
    // should send the email here if it was a real scenario
    save(emailToSend)
}

function toggleEmailStarred(emailId) {
    getById(emailId)
        .then((email) => {
            email.isStarred = !email.isStarred
            console.log('email.isStarred', email.isStarred);
            save(email)
        })
}

function _createEmails() {
    return [
        { sentBy: 'Guy', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,  },
        { sentBy: 'Puki', subject: 'Ad..', body: 'Buy me!', isRead: false, sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,  },
        { sentBy: 'Shluki', subject: 'Another ad', body: 'Buy me!', isRead: false, sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,  },
        { sentBy: 'Farem', subject: 'Another ad', body: 'Buy me!', isRead: false, sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,  },
        { sentBy: 'Tinder', subject: 'We will help you', body: 'Buy me!', isRead: false, sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,  },
        { sentBy: 'okCupid', subject: 'We will help you more', body: 'Buy me!', isRead: false, sentAt: 1551133930594, id: utilService.makeId(), isStarred: false,  }
    ]

}

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

function getById(emailId) {
    return storageService.get(EMAILS_KEY, emailId);
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




