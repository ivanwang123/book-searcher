import React, {useContext} from 'react'
import Login from './Login'
import {Redirect} from 'react-router-dom'
import {UserContext} from '../contexts/UserContext'
import firebase from '../config/fbConfig'

function AppNavbar(props) {
    const {isAuthenticated} = useContext(UserContext)
    
    const userLogout = () => {
      console.log("CLIK LOGOUT")
      props.history.push('/')
      firebase.auth().signOut()
          .then(() => {
              console.log("SIGN OUT")
          })
    }

    return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary d-flex justify-content-center">
            <a className="navbar-brand position-absolute" href="/">Bookz</a>
            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button> */}

            <div className="d-flex ml-auto">
              {isAuthenticated ? 
              <div className="d-flex">
                <button className="btn btn-info mr-3" type="button" onClick={()=>props.history.push('/bookshelf')}>Bookshelf</button>
                <button className="btn btn-primary" type="button" onClick={userLogout}>Logout</button>
              </div> :
              <Login />}
            </div>
          </nav>
        </div>
    )
}

export default AppNavbar
