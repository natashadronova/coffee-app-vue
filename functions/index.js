const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.deleteOrders = functions.https.onRequest((request, response) => {
  deleteCollection((path) => {
    console.log('cloud function')
    // Get a new write batch
    // var batch = firebase.firestore().batch()

    // firebase.firestore().collection('orders').listDocuments().then(val => {
    //     val.map((val) => {
    //         batch.delete(val)
    //     })

    //     batch.commit()
    // })
  }
  )
})

//https://firebase.google.com/docs/functions/schedule-functions
// 
// export scheduledFunctionCrontab =
// functions.pubsub.schedule('5 11 * * *').onRun((context) => {
//     console.log('This will be run every day at 11:05 AM UTC!');
// });