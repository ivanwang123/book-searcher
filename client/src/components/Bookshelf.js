import React, {useContext, useState, useEffect} from 'react'
import {UserContext} from '../contexts/UserContext'
import firebase from '../config/fbConfig'
import Login from './Login'
import BookModal from './BookModal'

function Bookshelf(props) {
    const {user, isAuthenticated} = useContext(UserContext)
    const [bookshelf, setBookshelf] = useState([])
    const [bookID, setBookID] = useState('')

    useEffect(() => {
        firebase.firestore().collection('users').doc(user.uid).get()
            .then(doc => {
                console.log("GET BOOKSHELF", doc.data())
                doc.data().bookshelf.forEach(book => {
                    fetch(`https://www.googleapis.com/books/v1/volumes/${book}`)
                        .then(res => res.json())
                        .then(result => {
                            setBookshelf(prevBookshelf => [result, ...prevBookshelf])
                        })
                })
            })
    }, [])

    const closeModal = () => {
        setBookID('')
    }

    const removeFromBookshelf = (id) => {
        setBookshelf(bookshelf.filter(book => book.id !== id))
        console.log("REMOVE FROM BOOKSHELF", id, bookshelf[0].id)
    }

    return (
        <div>
            {!isAuthenticated ?
            <Login /> : 
            <div className="container">
                <div className="display-3 text-primary w-100 mt-5 mb-5 p-3 pb-4 left-border"><strong>{user.displayName}'s</strong> Bookshelf</div>
                <div className="d-flex flex-wrap">

                {bookshelf.map(book => {
                    return (
                        <div className="book-display m-4" onClick={()=>setBookID(book.id)}>
                            <img className="book-img" src={book.volumeInfo.imageLinks.thumbnail}/>
                            <div className="w-100 text-center"><strong>{book.volumeInfo.title}</strong></div>
                            <div className="w-100 text-center">By {book.volumeInfo.authors[0]}</div>
                        </div>
                    )
                })}
                </div>
                {bookID.length ? 
                    <BookModal id={bookID} closeModal={closeModal} removeFromBookshelf={removeFromBookshelf}/> :
                    null}
            </div>}
        </div>
    )
}

export default Bookshelf
