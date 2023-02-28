import './css/styles.css';
import './images/turing-logo.png'
import fetchData from '/dist/apiCalls'
console.log('This is the JavaScript entry file - your code begins here.');

// Promise retrieval:
Promise.all([fetchData('customers'), fetchData('customer'), fetchData('roomData'), fetchData('bookings')])
  .then((responsesArray)=> {
    console.log(responsesArray);
    return responsesArray
  })