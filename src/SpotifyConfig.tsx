import fb from './Firebase';
const spotifyKeys = { clientId: '', clientSecret: '' };
fb.firestore()
  .collection('songs')
  .doc('APIKeys')
  .get()
  .then(function(doc) {
    if (doc.exists) {
      const data = doc.data();
      spotifyKeys.clientId = data!.clientId;
      spotifyKeys.clientSecret = data!.clientSecret;
      console.log('FIREBASE READ - read api keys');
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  });

export default spotifyKeys;
