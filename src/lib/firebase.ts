import {initializeApp, FirebaseOptions} from 'firebase/app'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore, enableMultiTabIndexedDbPersistence} from 'firebase/firestore'

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

export const firebaseApp = initializeApp(firebaseConfig)
export const googleProvider = new GoogleAuthProvider()
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseDb = getFirestore(firebaseApp)

enableMultiTabIndexedDbPersistence(firebaseDb).catch((e) => {
  if (e.code == 'failed-precondition') {
    console.log('failed-precondition')
    console.log(e)
  } else if (e.code == 'unimplemented') {
    console.log('unimplemented')
    console.log(e)
  } else {
    console.log('unknown')
    console.log(e)
  }
})
