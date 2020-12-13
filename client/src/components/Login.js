import React from 'react'
import firebase from '../config/fbConfig';

const provider = new firebase.auth.GoogleAuthProvider();

function Login() {

    const userLogin = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const token = res.credential.accessToken;
                const user = res.user
                console.log("USER", res)
                if (res.additionalUserInfo.isNewUser) {
                    firebase.firestore().collection('users').doc(res.user.uid).set({
                        bookshelf: []
                    })
                }
            }).catch(err => {
                console.log("LOGIN ERROR", err)
            })

        
    }

    return (
        <div>
            <button className="btn btn-info" type="button" onClick={userLogin}>Login</button>
        </div>
    )
}

export default Login
