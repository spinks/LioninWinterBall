// import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import config from './FirebaseConfig';

const fb = firebase.initializeApp(config);
fb.firestore().enablePersistence();

// to limit document reads (for firestore cost) we store all
// data in one document 'master/liwb' and read here
// exporting the document data for the rest of the app
// we should stay under the 20,000 item limit for firestore documents given the relatively minimal amount of conent

fb.auth()
    .signInAnonymously()
    .then(() => {
      console.log('signed in');
    })
    .catch(function(error) {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    // ...
    });

// fb.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     // const isAnonymous = user.isAnonymous;
//     const uid = user.uid;
//     console.log(uid);
//     // ...
//   } else {
//     // User is signed out.
//     // ...
//   }
//   // ...
// });

export default fb;
