import React, { useState } from 'react'
import { auth , googleauth } from '../../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup , signOut } from 'firebase/auth'
import './Auth.css'
import { async } from '@firebase/util'
function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSignIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        }
        catch (err) {
            console.log(err)
        }

    }
    const handleSignInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleauth)
        }
        catch (err) {
            console.log(err)
        }

    }
    const handleLogout = async () => {
        try {
            await signOut(auth)
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <div className='form'>
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
            <button type='submit' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Auth