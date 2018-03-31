//********************** */
// Object destructuring
//********************* */

// const person = {
//     name: 'Lair',
//     age: 44,
//     location: {
//         city: 'São Paulo',
//         temp: 25
//     }
// };

// const {name: firstName = 'Anonymous', age} = person;
// // const name = person.name;
// // const age = person.age

// console.log(`${firstName} is ${age}`);

// const {city, temp: temperature} = person.location;

// if (temperature && city) {
//     console.log(`It's ${temperature} in ${city}`);
// }

// if (person.location.city && person.location.temp) {
//     console.log(`It's ${person.location.city} in ${ person.location.temp}`);
// }

const book = { 
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
};

const {name: publisherName = 'Self-Published'} = book.publisher;

console.log(publisherName); // Penguin, Self-Published


/******************************
 * Array destructuring        *
 ******************************/
const address = ['18990 Av Nacoes Unidas', 'Sao Paulo', 'SP', '05882-000'];

const [, city, state = 'XX'] = address;  //rename var is not required

//console.log(`You are in ${address[1]} ${address[2]}.`);

console.log(`You are in ${city} ${state}.`);

const item = ['Coffee (hot)', '$3.00', '$3.50', '$3.75'];

const[itemName,,mediumPrice] = item;

console.log(`A medium ${itemName} costs ${mediumPrice}`);