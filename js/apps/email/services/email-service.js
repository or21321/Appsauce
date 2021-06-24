import { storageService } from "../../../services/async-storage-service.js"
import { utilService } from "../../../services/util-service.js"

const EMAILS_KEY = 'emails'

export const emailService = {
    query,
    getById
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

function _createEmails() {
    return [
        { sentBy: 'Guy', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594, id: utilService.makeId() },
        { sentBy: 'Puki', subject: 'Ad..', body: 'Buy me!', isRead: false, sentAt: 1551133930594, id: utilService.makeId() },
        { sentBy: 'Shmuki', subject: 'Another ad', body: 'Buy me!', isRead: false, sentAt: 1551133930594, id: utilService.makeId() },
        { sentBy: 'Shmuki', subject: 'Another ad', body: 'Buy me!', isRead: false, sentAt: 1551133930594, id: utilService.makeId() },
        { sentBy: 'Shmuki', subject: 'Another ad', body: 'Buy me!', isRead: false, sentAt: 1551133930594, id: utilService.makeId() },
        { sentBy: 'Shmuki', subject: 'Another ad', body: 'Buy me!', isRead: false, sentAt: 1551133930594, id: utilService.makeId() }
    ]

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

// function save(book) {
//     if (book.id) {
//         return storageService.put(BOOKS_KEY, book);
//     } else {
//         return storageService.post(BOOKS_KEY, book);
//     }
// }



