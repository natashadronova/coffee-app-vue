const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = require('firebase')
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.deleteOrders = functions.https.onRequest((request, response) => {

// })


exports.DeleteOrders = functions.https.onCall((data, context) => {
      console.log('function')
      var batch = firebase.firestore().batch()
      console.log('batch', batch)
      // firebase.firestore().collection('orders').listDocuments().then(val => {
      //     val.map((val) => {
      //         batch.delete(val)
      //     })
  
      //     batch.commit()
      // })
  }


    // firebase.collection('orders').get()
    //   .then(qs => {
    //     qs.forEach(docSnapshot => {
    //       promises.push(docSnapshot.ref.delete());
    //     });
    //     return Promise.all(promises);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     return false; 
    //   })



  })
//https://firebase.google.com/docs/functions/schedule-functions
// 
// export scheduledFunctionCrontab =
// functions.pubsub.schedule('5 11 * * *').onRun((context) => {
//     console.log('This will be run every day at 11:05 AM UTC!');
// });