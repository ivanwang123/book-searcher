import React, {useState, useEffect, useContext} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {UserContext} from '../contexts/UserContext';
import firebase from '../config/fbConfig';

function BookModal(props) {
    // const id = props.match.params.id
    // console.log("OPEN MODAL", props)
    const id = props.id

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [categories, setCategories] = useState([])
    const [previewLink, setPreviewLink] = useState('')  
    const [pageCount, setPageCount] = useState(0)  
    const [publishedDate, setPublishedDate] = useState('')  
    const [printType, setPrintType] = useState('')  
    const [inBookshelf, setInBookshelf] = useState(false)

    const {user, isAuthenticated} = useContext(UserContext)


    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
            .then(res => res.json())
            .then(result => {
                console.log("BOOK MODAL", result)
                setTitle(result.volumeInfo.title)
                setAuthor(result.volumeInfo.authors[0])
                if (result.volumeInfo.description)
                    setDescription(result.volumeInfo.description.replace( /(<([^>]+)>)/ig, ''))
                setThumbnail(result.volumeInfo.imageLinks.thumbnail)
                setImage(result.volumeInfo.imageLinks.small)
                setCategories(result.volumeInfo.categories ? result.volumeInfo.categories : [])
                setPreviewLink(result.volumeInfo.previewLink)
                setPageCount(result.volumeInfo.pageCount)
                setPublishedDate(result.volumeInfo.publishedDate)
                setPrintType(result.volumeInfo.printType)
            })

        firebase.firestore().collection('users').doc(user.uid).get()
            .then(res => {
                if (res.data().bookshelf.includes(id)) {
                    setInBookshelf(true)
                }
            })
    }, [])

    const addBook = () => {
        if (isAuthenticated) {
            if (inBookshelf) {
                firebase.firestore().collection('users').doc(user.uid).update({
                    bookshelf: firebase.firestore.FieldValue.arrayRemove(id)
                });
                setInBookshelf(false)
                if (props.removeFromBookshelf)
                    props.removeFromBookshelf(id)
            } else {
                console.log("ADD BOOK")
                firebase.firestore().collection('users').doc(user.uid).update({
                    bookshelf: firebase.firestore.FieldValue.arrayUnion(id)
                });
                setInBookshelf(true)
            }
        }
    }

    return (
        <div>
          {/* <Button color="danger" onClick={toggle}>Button</Button> */}
          {image.length ? console.log("IMAGE", image) : console.log("THUMBNAIL", thumbnail)}
          <Modal className="modal-lg" isOpen={true} toggle={props.closeModal}>
            <ModalHeader toggle={props.closeModal}>
                <button className="btn btn-success" type="button" onClick={addBook}>{inBookshelf ? 'Remove from Bookshelf' : 'Add to Bookshelf'}</button>
            </ModalHeader>
            <ModalBody className="d-flex flex-row modal-body">
                <div className="book-img-lg position-relative">
                    <img className="position-absolute book-img-lg" src={thumbnail}></img>
                    <img className="position-absolute book-img-lg" src={image}></img>
                </div>
                {/* <div className="book-img-lg">filler</div> */}
                <div className="ml-5">
                    <h4><strong><a href={previewLink} target="_blank" style={{color: "#222"}}>{title}</a></strong></h4>
                    By <strong>{author}</strong>
                    <div>
                        {categories.map(category => {
                            return (
                                <div className="badge badge-pill badge-primary">{category}</div>
                                )
                            })}
                    </div>
                    <div className="description mt-3">{description}</div>
                    {pageCount > 0 ? <div className="mt-2">Pages <strong>{pageCount}</strong></div> : null}
                    {printType.length ? <div className="mt-2">Print Type <strong>{printType}</strong></div> : null}
                    {publishedDate.length ? <div className="mt-2">Published <strong>{publishedDate}</strong></div> : null}
                </div>
            </ModalBody>
            {/* <ModalFooter>
              <Button color="primary" onClick={closeModal}>Do Something</Button>{' '}
              <Button color="secondary" onClick={closeModal}>Cancel</Button>
            </ModalFooter> */}
          </Modal>
        </div>
    );
}

export default BookModal
