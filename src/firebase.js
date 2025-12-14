import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBTdHnzsR4RD1wysL8XTc3b0xrbIHxXhuU',
  authDomain: 'quantumyou-b5f1b.firebaseapp.com',
  projectId: 'quantumyou-b5f1b',
  storageBucket: 'quantumyou-b5f1b.firebasestorage.app',
  messagingSenderId: '1051676888304',
  appId: '1:1051676888304:web:8b6471646f5b55736a8635',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Auth + providers
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword }
