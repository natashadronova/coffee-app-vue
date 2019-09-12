const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//https://firebase.google.com/docs/functions/schedule-functions
// 
// export scheduledFunctionCrontab =
// functions.pubsub.schedule('5 11 * * *').onRun((context) => {
//     console.log('This will be run every day at 11:05 AM UTC!');
// });