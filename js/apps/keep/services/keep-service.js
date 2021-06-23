import { storageService } from "../../../services/async-storage-service.js";
import { defaultNotes } from './keep-database.js';


const NOTES_KEY = 'notes'

export const keepService = {
    query,
    getNoteById,
    saveNotesToStorage,
    saveNote,
    removeNote

    // addGoogleBook,
}

const gNotes = defaultNotes

function query() {
    return storageService.query(NOTES_KEY)
    .then(notes => {
        if (!notes.length) {
            return saveNotesToStorage()
        } else return notes
    })
}

function getNoteById(noteId) {
    return storageService.get(NOTES_KEY, noteId);
}

function saveNotesToStorage() {
    return storageService.postMany(NOTES_KEY, gNotes)
}

function removeNote(noteId) {
    return storageService.remove(NOTES_KEY, noteId);
}

function saveNote(note) {
    if (note.id) {
        return storageService.put(NOTES_KEY, note);
    } else {
        return storageService.post(NOTES_KEY, note);
    }
}

function _createNote(note) {
    const {
        title, subtitle, authors, publishedDate, description, pageCount,
        categories, imageLinks, language
    } = book.volumeInfo
    const newBook = {
        id: book.id,
        title,
        subtitle,
        authors,
        publishedDate,
        description,
        pageCount,
        categories,
        thumbnail: imageLinks.thumbnail,
        language,
        listPrice: null
    }
    return newBook
}



function getEmptyCar() {
    return {
        id: '',
        vendor: '',
        maxSpeed: 0
    };
}

function addReview(bookId, review) {
    review.id = utilitiesService.makeId();
    return getBookById(bookId).then(book => {
        // return Promise.reject('ERROR GORNISHT')
        if (!book.reviews) book.reviews = [];
        book.reviews.push(review);
        return storageService.put(BOOKS_KEY, book);
    })
}

function _createCars() {
    let cars = utilService.loadFromStorage(CARS_KEY);
    if (!cars || !cars.length) {
        cars = [];
        cars.push(_createCar('fiak', 300));
        cars.push(_createCar('subali', 120));
        cars.push(_createCar('nisal', 100));
        cars.push(_createCar('mitsubashi', 150));
        utilService.saveToStorage(CARS_KEY, cars);
    }
    return cars;
}

function _createCar(vendor, maxSpeed = 250) {
    const car = {
        id: utilService.makeId(),
        vendor,
        imgUrl: `img/car/${vendor}.png`,
        maxSpeed,
    };
    return car;
}
// function addGoogleBook(googleBook) {
//     const newBook = _createBook(book)
//     storageService.post(BOOKS_KEY,newBook)
// }

        
        // function getNextBookId(bookId) {
            //     return query()
            //         .then(books => {
                //             const idx  = books.findIndex(book => book.id === bookId)
                //             return (idx === books.length-1)? books[0].id :  books[idx+1].id
                //         })
                // }
                // function getPreviousBookId(bookId) {
                //     return query()
                //     .then(books => {
                //         const idx  = books.findIndex(book => book.id === bookId)
                //         return (idx === 0)? books[books.length-1].id : books[idx-1].id
                //     })
                // }
                // function getGoogleBooks(searchTerm) {
                    //     return storageService.query(searchTerm)
                    //     .then(res => {
                    //         if (!res.length) {
                    //             return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchTerm}`)
                    //             .then(res => {
                    //                 storageService.postMany(searchTerm, res.data.items)
                    //                 console.log(res.data.items)
                    //                 return res.data.items
                    //             })
                                
                    //         } else {
                    //             console.log(res)
                    //             return res
                    //         }
                    //     })
                        
                        
                    // }