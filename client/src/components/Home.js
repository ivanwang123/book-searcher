import React, {useState, useContext} from 'react';
import BookModal from './BookModal';

function Home(props) {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [bookID, setBookID] = useState('');
    let category = 'book';

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.length) {
            let url = '';
            switch(category) {
                case 'book': url = `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40&key=AIzaSyDEmy-vCEHfQFT8sqC9N7wULEVHorsLUT4`; break;
                case 'genre': url = `https://www.googleapis.com/books/v1/volumes?q=+subject:${search}&maxResults=40&key=AIzaSyDEmy-vCEHfQFT8sqC9N7wULEVHorsLUT4`; break;
                case 'author': url = `https://www.googleapis.com/books/v1/volumes?q=+inauthor:${search}&maxResults=40&key=AIzaSyDEmy-vCEHfQFT8sqC9N7wULEVHorsLUT4`; break;
            }

            if (url.length)
                fetch(url)
                    .then(res => res.json())
                    .then(result => {
                        setBooks(result.items)
                        console.log("RESULT", result)
                        // setSearch('')
                    })
        }
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSelect = (e) => {
        category = e.target.value
    }

    const closeModal = () => {
        setBookID('')
    }

    return (
        <div className="container d-flex align-items-center justify-content-center flex-column">
            <h1 className="text-primary display-1 font-weight-bold mt-5 p-3 text-center">Bookz</h1>
            <form className="mt-5 d-flex w-75" onSubmit={handleSearch}>
                <select className="rounded bg-primary text-white border no-outline pl-2" onChange={handleSelect}>
                    <option value="book">Book</option>
                    <option value="genre">Genre</option>
                    <option value="author">Author</option>
                </select>

                <input className="w-100 form-control" type="text" name="search" onChange={handleChange} value={search} />
                <button className="btn btn-primary rounded">Search</button>
            </form>
            <div className="d-flex flex-wrap justify-content-center mt-5">
            {books.map(book => {
                console.log("BOOK", book)
                return (
                    <div className="book-display m-4" onClick={()=>setBookID(book.id)}>
                        <img className="book-img" src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''}/>
                        <div className="w-100 text-center mt-2"><strong>{book.volumeInfo.title}</strong></div>
                        <div className="w-100 text-center">By {book.volumeInfo.authors ? book.volumeInfo.authors[0] : ''}</div>
                    </div>
                )
            })}
            </div>
            {bookID.length ? 
                <BookModal id={bookID} closeModal={closeModal} /> :
            null}
        </div>
    )
}

export default Home
