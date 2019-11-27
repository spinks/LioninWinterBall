// import firebase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import config from './FirebaseConfig';

firebase.initializeApp(config);
firebase.firestore().enablePersistence();

// to limit document reads (for firestore cost) we store all
// data in one document 'master/liwb' and read here
// exporting the document data for the rest of the app
// we should stay under the 20,000 item limit for firestore documents given the relatively minimal amount of conent
const master: any = firebase
  .firestore()
  .collection('master')
  .doc('liwb');

export default master;
