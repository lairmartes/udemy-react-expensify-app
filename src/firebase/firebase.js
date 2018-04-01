import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

export {firebase, database as default };

// Worked with "on" for events as well
// database.ref('expenses').once('value')
//   .then((snapshot) => {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//     console.log(expenses);
//   }).catch((e) => {
//     console.log('Error when fetching data', e);
//   })

// const expense1 = {
//   description: 'Café',
//   note: '',
//   amount: 5.50,
//   createdAt: 5253452423422
// };

// const expense2 = {
//   description: 'Chá',
//   note: '',
//   amount: 5.00,
//   createdAt: 5253452000000
// };

// const expense3 = {
//   description: 'Chocolate',
//   note: '',
//   amount: 7.00,
//   createdAt: 5253499999999
// };

// database.ref('expenses').push(expense1);
// database.ref('expenses').push(expense2);
// database.ref('expenses').push(expense3);

// database.ref().on('value', (snapshot) => {
//   console.log(snapshot.val());
// });

// database.ref()
//   .once('value')
//   .then((snapshot) => {
//       const val = snapshot.val();
//       console.log(val);
//   }).catch((e) => {
//     console.log('Error fetching data', e)
//   });

//   database.ref().set({
//     name: 'Lair Martes',
//     age: 44,
//     stressLevel: 6,
//     job: {
//       title: 'Software developer',
//       company: 'Citibank'
//     },
//     isSingle: false,
//     location: {
//       city: 'São Paulo',
//       country: 'Brazil'
//     }
//   }).then(() => {
//     console.log('Data is saved');
//   }).catch((e) => {
//     console.log('This failed.', e);
//   });

//   database.ref('attributes').set({
//     height:' 1.72 m',
//     weight: '82 kg'
//   }).then(() => {
//     console.log("Attributes included");
//   }).catch((e) => {
//     console.log('Something goes wrong when attributing...');
//   });

// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'SkipTheDishes',
//   'location/city': 'Winnipeg'
// });

  // database.ref('isSingle')
  //   .remove()
  //   .then(() => {
  //     console.log('Data was removed');
  //   }).catch((e) => {
  //     console.log('Couldn\'t remove data');
  //   });