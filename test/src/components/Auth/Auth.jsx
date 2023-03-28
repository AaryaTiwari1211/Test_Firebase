import React, { useEffect, useState } from 'react'
import { auth, googleauth } from '../../config/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, } from 'firebase/auth'
import './Auth.css'
import { async } from '@firebase/util'

function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const[currentuser , setCurrentUser] = useState(null)
    const [render , setRender] = useState(false)

    const reRender = () => {
        setRender(!render)
    }
    const handleSignIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            setCurrentUser(auth.currentUser)
            reRender();
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                setCurrentUser(auth.currentUser)
                reRender()
                const user = userCredential.user;
                console.log(user)
            })
            console.log("User Signed In")
        }
        catch (err) {
            console.log(err)
        }

    }
    const handleSignInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleauth)
            setCurrentUser(auth.currentUser)
            reRender()
            console.log('Signed in with Google')
        }
        catch (err) {
            console.log(err)
        }

    }
    const handleLogout = async () => {
        try {
            await signOut(auth)
            setCurrentUser(null)
            reRender()
            console.log("Logout Successful")
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(()=> {
        console.log(currentuser?.uid)
    },[])

    return (
        <div className='form'>
            {currentuser?.uid}
            <br/>
            <input type='text' value={email} placeholder='Email' onChange={(event) => setEmail(event.target.value)} />
            <br />
            <br />
            <input type='password' value={password} placeholder='Password' onChange={(event) => setPassword(event.target.value)} />
            <br />
            <br />
            <button type='submit' onClick={handleSignIn}>Sign In with Email</button>
            <br />
            <br />
            <button type='submit' onClick={handleSignInWithGoogle}>Sign In with Google</button>
            <br />
            <br />
            <button type='submit' onClick={handleLogin}>Login</button> 
            <br />
            <br />
            <button type='submit' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Auth